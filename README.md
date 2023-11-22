# typewriter
简易版本打字机，非常简单，一行代码搞定
simple typewriter，Simple typing effect

# 初始化传入一个函数，每当文字改变则调用该函数
```typescript
import Typewriter from "./index.ts";

const typewriter = new Typewriter((newWord) => {
  // 每当文字改变则调用该函数，你可以在这更新试图

  // # 例如在Vue,React里面更新文字状态
  setState(newWord)
  // # 或者直接设置dom的text
  dom.innerText = newWord;
})
```

# playTo 使用方法，可重复播放
```typescript
// 一行代码搞定
typewriter.playTo("这是需要播放的文字").then(() => {
  console.log(“打字完成”)
})

// 或者可以这样
// 上一段文字完成后，会自动删除文字进行下一段打字
typewriter.playTo("第一段文字").then(() => {
    return typewriter.playTo("第二段文字")
}).then(() => {
    return typewriter.playTo("第三段文字")
}).then(() => {
    return typewriter.playTo("第四段文字")
}).then(() => {
    return typewriter.playTo("第五段文字")
})
```

# play 播放
```typescript
  typewriter.setText("这是需要播放的文字")
  typewriter.play().then(() => {
    // 完成
  })
```

# delAll 删除
```typescript
  typewriter.delAll().then(() => {
    // 完成
  })
```


# 给标签设置打字标

```css
.words-bline::after {
  content: "|";
  color: black;
  animation: words-blink-animate 1s infinite;
}

@keyframes words-blink-animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

```
