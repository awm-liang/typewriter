

class Typewriter {

    // 更新回调函数
    private onChange: (newWord: string) => void;

    private text: string = "";
    private textArr: string[] = [];

    // 结果
    private result: string = "";

    // 当前显示字数
    private index: number = -1;

    // 100ms打一个字
    private time: number = 100;

    // 定时器
    private timeId: any;
    private awaitTimeId: any;

    constructor(onChange: (newWord: string) => void) {
        this.onChange = onChange;
    }

    // 设置文字
    setText(t: string) {
        this.text = t;
        this.textArr = t.split("")
        this.index = -1
    }

    update() {
        this.result = this.textArr.slice(0, this.index).join("")
        this.onChange(this.result)
    }

    // 播放
    play() {
        this.index = -1;
        return new Promise((resolve) => {
            const start = () => {
                this.index += 1;
                if (this.index <= this.textArr.length) {
                    this.update()
                    this.clearTime()
                    this.timeId = setTimeout(start.bind(this), this.time)
                } else {
                    resolve(this.result)
                }
            }

            start()
        })
    }


    // 连续播放+自动清除
    playTo(text?: string) {
        return new Promise((resolve) => {
            if(this.index <= -1) {
                text && this.setText(text);
                this.play().then(resolve)
            } else {
                this.awaitTimeId = setTimeout(() => {
                    this.delAll().then(() => {
                        if(text) {
                            this.setText(text)
                        } else {
                            this.index = -1
                        }
                        this.play().then(resolve);
                    })
                }, 1000);
            }
        })
        
    }

    // 删除文字
    delAll() {
        return new Promise((resolve) => {
            const del = () => {
                this.index -= 1;
                if (this.index <= -1) {
                    resolve(this.result)
                } else {
                    this.update()
                    this.clearTime()
                    this.timeId = setTimeout(del.bind(this), this.time / 2)
                }
            }
            
            del()
        })
    }

    clearTime() {
        clearTimeout(this.timeId)
        clearTimeout(this.awaitTimeId)
    }
}

export default Typewriter;
