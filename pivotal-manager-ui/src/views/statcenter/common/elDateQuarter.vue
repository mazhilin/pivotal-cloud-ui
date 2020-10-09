<template>
    <div class="el-date-quarter">
        <div class='el-input el-input--prefix' style='position:relative;'>
            <el-popover
            placement="bottom"
            v-model="isShowEnd"
            trigger="focus">
                <div class="el-picker-panel__body-wrapper">
                    <div class="el-picker-panel__body">
                        <div class="el-date-picker__header el-date-picker__header--bordered">
                            <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click='endQuarterYear--'></button>
                            <span role="button" class="el-date-picker__header-label">{{endQuarterYear}} 年</span>
                            <button type="button" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right" @click='endQuarterYear++'></button>
                        </div>
                        <div class="el-picker-panel__content">
                            <table class="el-month-table" style="">
                            <tbody>
                                <tr>
                                <td :class='item.isDisabled?"disabled":item.isCurrent? "current":""' v-for='(item,index) in endQuarterArr' :key='index'><div><a class="cell" @click='clickEndQuarter(item)'>{{item.name}}</a></div></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <el-input
                    placeholder="选择时间"
                    maxlength='5'
                    slot="reference"
                    @blur='endTimeBlur'
                    @focus='endTimeFocus'
                    prefix-icon="el-icon-date"
                    clearable
                    v-model="value">
                </el-input>
            </el-popover>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        vModel:{
            type: String
        }
    },
    data(){
        return {
            isShowEnd: false,
            endQuarterYear: null,
            endQuarterArr: [
                {value: '1', name: '一季度', isCurrent: false, isDisabled: false},
                {value: '2', name: '二季度', isCurrent: false, isDisabled: false},
                {value: '3', name: '三季度', isCurrent: false, isDisabled: false},
                {value: '4', name: '四季度', isCurrent: false, isDisabled: false}
            ],
            value: null
        }
    },
    created () {
        this.endQuarterYear = new Date().getFullYear()
        this.value = this.vModel
    },
    watch: {
        'value'(newVal){
            this.$emit('changeFn', newVal)
        },
        endQuarterYear (newVal) {
            this.endQuarterYearFn(newVal)
        }
    },
    methods: {
        endQuarterYearFn (newVal) {
            let startYear = 0
            let startMount = 0
            if (newVal > new Date().getFullYear()) {
                this.endQuarterArr.forEach(item => {
                    item.isDisabled = true
                })
            } else if (newVal === new Date().getFullYear()) {
                let currentMount = Math.ceil((new Date().getMonth() + 1) / 3)
                this.endQuarterArr.forEach(item => {
                if (item.value > currentMount) {
                    item.isDisabled = true
                } else {
                    item.isDisabled = false
                }
                })
            } else {
                this.endQuarterArr.forEach(item => {
                    item.isDisabled = false
                })
            }
        },
        // 点击结束时间季度处理函数
        clickEndQuarter (item) {
            if (item.isDisabled) {
                return false
            }
            if (this.endQuarterYear > new Date().getFullYear()) {
                this.endQuarterYear = new Date().getFullYear()
            }
            this.endQuarterArr.forEach(val => {
                val.isCurrent = false
            })
            item.isCurrent = true
            this.value = '' + this.endQuarterYear + '年第'+ item.value + '季度'
            this.isShowEnd = false
        },
        endTimeBlur () {
            if (this.value) {
                let maxCurrentVal = 4
                this.endQuarterYear = +this.value.substr(0, 4)
                let currentVal = parseInt(this.value.substr(6, 1))
                if (this.endQuarterYear === new Date().getFullYear()) {
                    maxCurrentVal = Math.ceil((new Date().getMonth() + 1) / 3)
                }
                if (!currentVal) {
                    currentVal = 1
                } else if (currentVal > maxCurrentVal) {
                    currentVal = maxCurrentVal
                }
                if (this.endQuarterYear > new Date().getFullYear()) {
                    this.endQuarterYear = new Date().getFullYear()
                    currentVal = Math.ceil((new Date().getMonth() + 1) / 3)
                }
                this.value = '' + this.endQuarterYear + '年第' + currentVal + '季度'
            }
        },
        // 输入款获取焦点处理函数
        endTimeFocus () {
            if (this.value) {
                this.endQuarterYear = +this.value.substr(0, 4)
                let currentVal = this.value.substr(6, 1)
                this.endQuarterArr.forEach(item => {
                    if (item.value === currentVal) {
                        item.isCurrent = true
                    } else {
                        item.isCurrent = false
                    }
                })
            }
            this.endQuarterYearFn(this.endQuarterYear)
            this.isShowEnd = true
        },
    }
}
</script>
<style lang="scss">
.el-date-quarter{
    display: inline-block;
    .popperBox{
        position: absolute;
        width: 400px;
        background-color: #fff;
        bottom: 0;
        left:50%;
        transform: translate(-50%, calc(100% + 10px));
        border:1px solid #eaecf1;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index: 2019;
        &::before{
            width: 0;
            content: '';
            position: absolute;
            border-bottom:6px solid #fff;
            border-left:6px solid transparent;
            border-top:6px solid transparent;
            border-right:6px solid transparent;
            top: -11px;
            z-index: 99;
            left:50%;
            transform: translateX(-50%);
        }
    }
    .windowBox{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top:0;
        left:0;
        z-index: 0;
    }
}
</style>


