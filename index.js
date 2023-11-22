class Typewriter {
    constructor(onChange) {
        this.text = "";
        this.textArr = [];
        // 结果
        this.result = "";
        // 当前显示字数
        this.index = -1;
        // 100ms打一个字
        this.time = 100;
        this.onChange = onChange;
    }
    // 设置文字
    setText(t) {
        this.text = t;
        this.textArr = t.split("");
        this.index = -1;
    }
    update() {
        this.result = this.textArr.slice(0, this.index).join("");
        this.onChange(this.result);
    }
    // 播放
    play() {
        this.index = -1;
        return new Promise((resolve) => {
            const start = () => {
                this.index += 1;
                if (this.index <= this.textArr.length) {
                    this.update();
                    this.clearTime();
                    this.timeId = setTimeout(start.bind(this), this.time);
                }
                else {
                    resolve(this.result);
                }
            };
            start();
        });
    }
    // 连续播放+自动清除
    playTo(text) {
        return new Promise((resolve) => {
            if (this.index <= -1) {
                text && this.setText(text);
                this.play().then(resolve);
            }
            else {
                this.awaitTimeId = setTimeout(() => {
                    this.delAll().then(() => {
                        if (text) {
                            this.setText(text);
                        }
                        else {
                            this.index = -1;
                        }
                        this.play().then(resolve);
                    });
                }, 1000);
            }
        });
    }
    // 删除文字
    delAll() {
        return new Promise((resolve) => {
            const del = () => {
                this.index -= 1;
                if (this.index <= -1) {
                    resolve(this.result);
                }
                else {
                    this.update();
                    this.clearTime();
                    this.timeId = setTimeout(del.bind(this), this.time / 2);
                }
            };
            del();
        });
    }
    clearTime() {
        clearTimeout(this.timeId);
        clearTimeout(this.awaitTimeId);
    }
}
export default Typewriter;
