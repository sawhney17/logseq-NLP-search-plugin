import '@logseq/libs'
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { App2, App} from './App'
import './index.css'
import '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna'
import { handleClosePopup } from './handleClosePopup'


async function formatText(text2){
  var text = text2.replace(/:LOGBOOK:|collapsed:: true/gi, '');
      if (text.includes('CLOCK: [')) {
        text = text.substring(0, text.indexOf('CLOCK: ['));
      }

      const rxGetId = /\(\(([^)]*)\)\)/;
            const blockId = rxGetId.exec(text);
            if (blockId != null){
            const block = await logseq.Editor.getBlock(blockId[1], {
              includeChildren: true,
            });
if (block!= null ){
            text = text.replace(
              `((${blockId[1]}))`,
              block.content.substring(0, block.content.indexOf('id::'))
            )};}

      if (text.indexOf(`\nid:: `) === -1) {
        return text;
      } else {
        return text.substring(0, text.indexOf(`\nid:: `));
}
}
function parseBlocksTree(obj){
  conductParsing(obj)
  function conductParsing(obj){
    if (obj.content) {
      let content2 = obj.content
      let level = obj.level
    blocks2.push([content2, level])
      }

      obj.children.map(conductParsing)
  }
}
async function answer_questions(text, qtext) {
  let model = await qna.load();
  const passage = text
  const question = qtext
  console.log(passage)
  console.log(question)
  const answers = await model.findAnswers(question, passage);
  console.log(answers)
  if (answers[1] != undefined){
    renderfinalApp([answers[0].text, answers[1].text], question)
  }
  else if (answers[0] == undefined){
    renderfinalApp("No Result", "No Result")
  }
  else{
    renderfinalApp([answers[0].text, "No result"], question)
  }

  
}
export async function createQuery (qtext) {
  blocks2 = []
  const currentBlock = await logseq.Editor.getCurrentPageBlocksTree()
  for (const x in currentBlock){
  parseBlocksTree(currentBlock[x])}
  
  var finalString;
  
  for (const x in blocks2){
    var formattedText = await formatText(blocks2[x][0])
    formattedText = formattedText
    
    finalString = `${finalString}. ${formattedText}`
  }
  answer_questions(finalString, qtext)
}
var blocks2 = []

const isDevelopment = import.meta.env.DEV
console.log("bye")

if (isDevelopment) {
  renderApp('browser')
} else {
  console.log('NLP Search Loaded')
  logseq.ready(() => {

    logseq.provideModel({
      show() {
        renderApp('logseq')
        logseq.showMainUI()
      },
    })

    logseq.App.registerUIItem('toolbar', {
      key: 'logseq-plugin-react-boilerplate',
      template: '<a data-on-click="show" class="button"><i class="ti ti-search"></i></a>',
    })

  })
}

function renderApp(env: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App env={env} />
    </React.StrictMode>,
    document.getElementById('root')
  )
  handleClosePopup()
}

function renderfinalApp(results, question: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App2 results={[results,question]}/> {/*Turning the results and quesitons into an array */}
    </React.StrictMode>,
    
    document.getElementById('root')
  )
  handleClosePopup()
}