<!--  -->
<template>
  <div class="home">
    <div id="annotation-container" ref="containerRef">
      <svg id="annotation-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect
          v-for="(item, index) in rectList"
          :key="index"
          :x="item.x"
          :y="item.y"
          :width="item.width"
          :height="item.height"
          fill-opacity="0.3"
          class="colored-rect-1"
          onclick="alert('click!')"
        ></rect>
      </svg>
      <div id="annotation-doc-content" ref="textContentRef" class="annotation-doc-content" @mouseup="getSelect">{{ textContent }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'

const textContent = ref<string>('')
const textContentRef = ref<any>(null)
const containerRef = ref<any>(null)
const textContentHeight = ref<string>('0')
let contentPositionX = 0
let contentPositionY = 0

interface RectType {
  x: number
  y: number
  width: number
  height: number
}
const rectList = reactive<RectType[]>([])
const getText = () => {
  return new Promise<void>(resolve => {
    //  更新数据devInfo.txt文件接口
    let xhr = new XMLHttpRequest(),
      okStatus = document.location.protocol === 'file:' ? 0 : 200
    xhr.open('GET', 'https://icfs.qjz.world:18088/icfs/bafk43jqbedft4wob5xwfq3rmthgozbuq3vmgvdajlvifg76svriorhb3ydnf6', false) // 文件路径
    xhr.overrideMimeType('text/html;charset=utf-8') //默认为utf-8
    xhr.send(null)
    // console.log(xhr.responseText) //打印文件信息
    textContent.value = xhr.responseText
    resolve()
  })
}

onMounted(async () => {
  await getText()

  textContentHeight.value = textContentRef.value.clientHeight + 'px'
  // window.onresize = function () {
  textContentHeight.value = textContentRef.value.clientHeight + 'px'
  // }

  contentPositionX = textContentRef.value.getBoundingClientRect().x
  contentPositionY = textContentRef.value.getBoundingClientRect().y

  // // const selection = document.getSelection()
  // // if (selection) {
  // const range = document.createRange()
  // const rangeDivDom = document.querySelector('#annotation-doc-content')
  // if (rangeDivDom) {
  //   const rangeText = rangeDivDom.firstChild
  //   if (rangeText) {
  //     range.setStart(rangeText, 2)
  //     range.setEnd(rangeText, 6)
  //     // console.log(range.getBoundingClientRect())
  //     // selection.removeAllRanges()
  //     // selection.addRange(range)
  //     // getSelect()
  //     drawRects(range.getBoundingClientRect())
  //   }
  //   // }
  // }
})

const getSelect = (e?: Event) => {
  const selection: Selection = window.getSelection()!
  const range = selection.getRangeAt(0)
  const content = selection.toString()
  if (content) {
    if (content.includes('\n')) {
      message.warning('暂不支持多行标注!')
      selection.removeAllRanges()
      return
    }
    const rects = range.getClientRects()
    let intersect = false

    for (let index = 0; index < rects.length; index++) {
      const element = rects[index]
      intersect = drawRects(element)
      if (intersect) break
    }
    if (intersect) message.warning('暂不支持多标签')
  }
}
// bafym3jqbede4igr6wqzspf4o2sqxbvvws3jhbxzyrpajfb4ggr4xfdcmskwdq  8MB
//
const drawRects = (rect: DOMRect): boolean => {
  let intersect = false
  const tempRect = {
    x: rect.x - contentPositionX,
    y: rect.y - contentPositionY + containerRef.value.scrollTop,
    width: rect.width,
    height: rect.height
  }
  // 判断是否相交
  rectList.some(item => {
    if (checkIntersect(item, tempRect)) {
      intersect = true
      return true
    }
  })
  if (!intersect) {
    rectList.push(tempRect)
  }
  return intersect
}

// 判断两个矩形是否相交
const checkIntersect = (RectA: RectType, RectB: RectType) => {
  const nonIntersect =
    RectB.x + RectB.width <= RectA.x || RectB.x >= RectA.x + RectA.width || RectB.y + RectB.height <= RectA.y || RectB.y >= RectA.y + RectA.height
  //相交
  return !nonIntersect
}
</script>
<style lang="scss" scoped>
.home {
  #annotation-container {
    font-size: 14px;
    position: relative;
    width: 900px;
    overflow: auto;
    height: 100%;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
    svg:not(:root) {
      overflow: hidden;
    }
    #annotation-svg-container {
      position: absolute;
      display: block;
      pointer-events: none;
      z-index: 10;
      width: 100%;
      top: 0;
      left: 0;
      height: v-bind(textContentHeight);
      .colored-rect-1 {
        fill: #ef5353;
        pointer-events: auto;
        cursor: pointer;
      }
    }
    #annotation-doc-content {
      background: rgba(236, 236, 236, 0.2);
      background-image: linear-gradient(#eff1f3 50%, transparent 0);
      background-size: auto 10em;
      background-origin: content-box;
    }
    .annotation-doc-content {
      position: absolute;
      white-space: pre-wrap;
      letter-spacing: 1px;
      word-break: break-word;
      line-height: 5em;
      padding: 2em 2em 0 2em;
      top: 0;
      left: 0;
      vertical-align: text-bottom;
      width: 100%;
    }
  }
}
</style>
