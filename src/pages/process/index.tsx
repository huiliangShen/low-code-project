/* eslint-disable */
import React, {useEffect, useState} from 'react'
import styles from './index.scss'
import BpmnModeler from 'bpmn-js/lib/Modeler'
// import minimapModule from 'diagram-js-minimap'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// import text from '@src/apply.bpmn'
import {message} from 'antd'

const Process = () => {
    const [view, setView] = useState<any>(null)

    useEffect(() => {
        init()
    }, [])

    function init() {
        const viewer = new BpmnModeler({
            container: '#canvas',
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor
            }
        })
        viewer.importXML('<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0dreezv" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.5.0">\n' +
            '  <bpmn:process id="Process_1kbs5ha" isExecutable="true">\n' +
            '    <bpmn:startEvent id="StartEvent_1" name="审批请求">\n' +
            '      <bpmn:extensionElements>\n' +
            '        <camunda:formData>\n' +
            '          <camunda:formField id="amount" label="金额" type="long" defaultValue="0" />\n' +
            '        </camunda:formData>\n' +
            '        <camunda:properties>\n' +
            '          <camunda:property name="amount" value="0" />\n' +
            '        </camunda:properties>\n' +
            '      </bpmn:extensionElements>\n' +
            '      <bpmn:outgoing>Flow_0jxy4sp</bpmn:outgoing>\n' +
            '    </bpmn:startEvent>\n' +
            '    <bpmn:exclusiveGateway id="amount" name="金额大小？">\n' +
            '      <bpmn:extensionElements>\n' +
            '        <camunda:properties>\n' +
            '          <camunda:property name="amount" value="0" />\n' +
            '        </camunda:properties>\n' +
            '      </bpmn:extensionElements>\n' +
            '      <bpmn:incoming>Flow_0jxy4sp</bpmn:incoming>\n' +
            '      <bpmn:outgoing>Flow_19yq7bb</bpmn:outgoing>\n' +
            '      <bpmn:outgoing>Flow_1vjv63d</bpmn:outgoing>\n' +
            '    </bpmn:exclusiveGateway>\n' +
            '    <bpmn:sequenceFlow id="Flow_0jxy4sp" sourceRef="StartEvent_1" targetRef="amount" />\n' +
            '    <bpmn:sequenceFlow id="Flow_19yq7bb" name="金额&#60;1000元" sourceRef="amount" targetRef="Activity_0370aeb">\n' +
            '      <bpmn:extensionElements>\n' +
            '        <camunda:properties>\n' +
            '          <camunda:property name="amount" value="0" />\n' +
            '        </camunda:properties>\n' +
            '      </bpmn:extensionElements>\n' +
            '      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${amount&lt;1000}</bpmn:conditionExpression>\n' +
            '    </bpmn:sequenceFlow>\n' +
            '    <bpmn:sequenceFlow id="Flow_1vjv63d" name="金额&#62;=1000元" sourceRef="amount" targetRef="Activity_1v69p2z">\n' +
            '      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${amount&gt;1000}</bpmn:conditionExpression>\n' +
            '    </bpmn:sequenceFlow>\n' +
            '    <bpmn:exclusiveGateway id="Gateway_1usyx3u">\n' +
            '      <bpmn:incoming>Flow_18bjrss</bpmn:incoming>\n' +
            '      <bpmn:outgoing>Flow_1kchd5p</bpmn:outgoing>\n' +
            '      <bpmn:outgoing>Flow_0zjbjt1</bpmn:outgoing>\n' +
            '    </bpmn:exclusiveGateway>\n' +
            '    <bpmn:sequenceFlow id="Flow_18bjrss" sourceRef="Activity_1v69p2z" targetRef="Gateway_1usyx3u" />\n' +
            '    <bpmn:endEvent id="Event_0hfmyw4" name="支付失败">\n' +
            '      <bpmn:incoming>Flow_1kchd5p</bpmn:incoming>\n' +
            '    </bpmn:endEvent>\n' +
            '    <bpmn:sequenceFlow id="Flow_1kchd5p" name="No" sourceRef="Gateway_1usyx3u" targetRef="Event_0hfmyw4">\n' +
            '      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${!approved}</bpmn:conditionExpression>\n' +
            '    </bpmn:sequenceFlow>\n' +
            '    <bpmn:sequenceFlow id="Flow_0zjbjt1" name="Yes" sourceRef="Gateway_1usyx3u" targetRef="Activity_0370aeb">\n' +
            '      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${approved}</bpmn:conditionExpression>\n' +
            '    </bpmn:sequenceFlow>\n' +
            '    <bpmn:endEvent id="Event_1ocqbux" name="支付成功">\n' +
            '      <bpmn:incoming>Flow_07momta</bpmn:incoming>\n' +
            '    </bpmn:endEvent>\n' +
            '    <bpmn:sequenceFlow id="Flow_07momta" sourceRef="Activity_0370aeb" targetRef="Event_1ocqbux" />\n' +
            '    <bpmn:userTask id="Activity_1v69p2z" name="审批" camunda:assignee="demo">\n' +
            '      <bpmn:extensionElements>\n' +
            '        <camunda:formData>\n' +
            '          <camunda:formField id="approved" label="是否批准" type="boolean" defaultValue="true" />\n' +
            '          <camunda:formField id="amount" label="金额" type="long" />\n' +
            '          <camunda:formField id="item" label="项目" type="string" />\n' +
            '        </camunda:formData>\n' +
            '      </bpmn:extensionElements>\n' +
            '      <bpmn:incoming>Flow_1vjv63d</bpmn:incoming>\n' +
            '      <bpmn:outgoing>Flow_18bjrss</bpmn:outgoing>\n' +
            '    </bpmn:userTask>\n' +
            '    <bpmn:serviceTask id="Activity_0370aeb" name="支付账单" camunda:type="external" camunda:topic="charge-card">\n' +
            '      <bpmn:extensionElements>\n' +
            '        <camunda:properties>\n' +
            '          <camunda:property name="amount" value="0" />\n' +
            '        </camunda:properties>\n' +
            '      </bpmn:extensionElements>\n' +
            '      <bpmn:incoming>Flow_19yq7bb</bpmn:incoming>\n' +
            '      <bpmn:incoming>Flow_0zjbjt1</bpmn:incoming>\n' +
            '      <bpmn:outgoing>Flow_07momta</bpmn:outgoing>\n' +
            '    </bpmn:serviceTask>\n' +
            '  </bpmn:process>\n' +
            '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
            '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1kbs5ha">\n' +
            '      <bpmndi:BPMNEdge id="Flow_0jxy4sp_di" bpmnElement="Flow_0jxy4sp">\n' +
            '        <di:waypoint x="215" y="177" />\n' +
            '        <di:waypoint x="265" y="177" />\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_19yq7bb_di" bpmnElement="Flow_19yq7bb">\n' +
            '        <di:waypoint x="315" y="177" />\n' +
            '        <di:waypoint x="500" y="177" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="376" y="159" width="65" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_1vjv63d_di" bpmnElement="Flow_1vjv63d">\n' +
            '        <di:waypoint x="290" y="202" />\n' +
            '        <di:waypoint x="290" y="290" />\n' +
            '        <di:waypoint x="370" y="290" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="271" y="243" width="71" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_18bjrss_di" bpmnElement="Flow_18bjrss">\n' +
            '        <di:waypoint x="470" y="290" />\n' +
            '        <di:waypoint x="525" y="290" />\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_1kchd5p_di" bpmnElement="Flow_1kchd5p">\n' +
            '        <di:waypoint x="575" y="290" />\n' +
            '        <di:waypoint x="682" y="290" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="622" y="272" width="15" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_0zjbjt1_di" bpmnElement="Flow_0zjbjt1">\n' +
            '        <di:waypoint x="550" y="265" />\n' +
            '        <di:waypoint x="550" y="217" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="556" y="238" width="18" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNEdge id="Flow_07momta_di" bpmnElement="Flow_07momta">\n' +
            '        <di:waypoint x="600" y="177" />\n' +
            '        <di:waypoint x="678" y="177" />\n' +
            '      </bpmndi:BPMNEdge>\n' +
            '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
            '        <dc:Bounds x="179" y="159" width="36" height="36" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="175" y="202" width="45" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Gateway_0t92nuh_di" bpmnElement="amount" isMarkerVisible="true">\n' +
            '        <dc:Bounds x="265" y="152" width="50" height="50" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="264" y="122" width="55" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Gateway_1usyx3u_di" bpmnElement="Gateway_1usyx3u" isMarkerVisible="true">\n' +
            '        <dc:Bounds x="525" y="265" width="50" height="50" />\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Event_1ocqbux_di" bpmnElement="Event_1ocqbux">\n' +
            '        <dc:Bounds x="678" y="159" width="36" height="36" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="674" y="202" width="44" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Event_0hfmyw4_di" bpmnElement="Event_0hfmyw4">\n' +
            '        <dc:Bounds x="682" y="272" width="36" height="36" />\n' +
            '        <bpmndi:BPMNLabel>\n' +
            '          <dc:Bounds x="678" y="315" width="45" height="14" />\n' +
            '        </bpmndi:BPMNLabel>\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Activity_0av256p_di" bpmnElement="Activity_1v69p2z">\n' +
            '        <dc:Bounds x="370" y="250" width="100" height="80" />\n' +
            '      </bpmndi:BPMNShape>\n' +
            '      <bpmndi:BPMNShape id="Activity_1ak989u_di" bpmnElement="Activity_0370aeb">\n' +
            '        <dc:Bounds x="500" y="137" width="100" height="80" />\n' +
            '      </bpmndi:BPMNShape>\n' +
            '    </bpmndi:BPMNPlane>\n' +
            '  </bpmndi:BPMNDiagram>\n' +
            '</bpmn:definitions>').then((result: any) => {
            console.log(result)
            // const {warnings} = result
            // message.success(result)
            // this.viewer.get('canvas').zoom('fit-vie//wport')
            // this.hiddenLogo()
        }).catch((err: any) => {
            // const {warnings, message} = err
            message.error(err.warnings + err.message)
        })
        setView(viewer)
    }

    return <div className={styles.processWrap}>
        <div id="canvas"></div>
        <div className="properties-panel-parent" id="js-properties-panel"></div>
    </div>
}

export default Process
