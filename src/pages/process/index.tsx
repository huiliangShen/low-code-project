/* eslint-disable */
import React, {useCallback, useEffect, useState} from 'react'
import styles from './index.scss'
import BpmnModeler from 'bpmn-js/lib/Modeler'
// import minimapModule from 'diagram-js-minimap'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import Demo from '@src/sipc.bpmn'
import {message} from 'antd'
import eventBus from '@lib/eventBus'

const Process = () => {
    const [view, setView] = useState<any>(null)

    useEffect(() => {
        init()
        return () => {
            eventBus.off('saveXml', callback)
        }
    }, [])

    useEffect(() => {
        eventBus.off('saveXml', callback)
        eventBus.on('saveXml', callback)
    }, [view])

    function callback() {
        saveXml()
    }

    const saveXml = useCallback(() => {
        view && view.saveXML({format: true})
            .then((result: {xml: string}) => {
                sessionStorage.setItem('xml', result.xml)
                message.success('流程保存成功')
            })
            .catch((err: string) => message.error(err))
    }, [view])

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
        viewer.importXML(Demo).then((result: any) => {
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
