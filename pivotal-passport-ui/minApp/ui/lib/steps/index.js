import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';
VantComponent({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        desColor: {
            type: String,
            value: GREEN
        },
        direction: {
            type: String,
            value: 'horizontal'
        },
        activeColor: {
            type: String,
            value: GREEN
        }
    }
});
