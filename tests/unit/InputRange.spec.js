import { shallowMount } from '@vue/test-utils';
import InputRange from '@/components/InputRange';

describe('InputRange', () => {
    let wrapper;

    it('renders the passed value', () => {
        const modelValue = 50;

        wrapper = shallowMount(InputRange, {
            props: {
                modelValue,
            },
        });

        wrapper.findAll('input').forEach((input) => {
            expect(parseInt(input.element.value, 10)).toEqual(modelValue);
        });
    });

    it('updates the passed value', async () => {
        const modelValue = 75;

        wrapper.setProps({
            modelValue,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.findAll('input').forEach((input) => {
            expect(parseInt(input.element.value, 10)).toEqual(modelValue);
        });
    });

    it('emits the update event on input change', () => {
        let modelValue = 100;

        wrapper.find('input[type="range"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ modelValue ]);

        modelValue = 50;

        wrapper.find('input[type="number"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][1]).toEqual([ modelValue ]);

        delete wrapper.emitted()['update:modelValue'];
    });

    it('does rudimentary validation of input values', async () => {
        wrapper.setProps({
            max: 5,
        });

        await wrapper.vm.$nextTick(() => {});

        let modelValue = 6;

        wrapper.find('input[type="range"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ 5 ]);

        wrapper.setProps({
            min: 0,
        });

        await wrapper.vm.$nextTick(() => {});

        modelValue = -1;

        wrapper.find('input[type="number"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ 5 ]);

        wrapper.setProps({
            step: 0.01,
        });

        await wrapper.vm.$nextTick(() => {});

        modelValue = 0.05;

        wrapper.find('input[type="number"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][1]).toEqual([ modelValue ]);
    });

    it('supports the label prop', async () => {
        expect(wrapper.find('label').exists()).toBe(false);

        const label = 'Foo bar';

        wrapper.setProps({
            label,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('label').text()).toEqual(label);
    });

    it('renders the label element', () => {
        const labelElement = wrapper.find('label');

        expect(labelElement.exists()).toEqual(true);

        const fieldId = labelElement.attributes('for');

        expect(fieldId).not.toBeUndefined();
        expect(wrapper.find('input[type="range"]').attributes('id')).toEqual(fieldId);
    });

    it('supports the minimum prop', async () => {
        const min = 0;

        wrapper.setProps({
            min,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.findAll('input').forEach((input) => {
            expect(parseInt(input.attributes('min'), 10)).toEqual(min);
        });
    });

    it('supports the maximum prop', async () => {
        const max = 50;

        wrapper.setProps({
            max,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.findAll('input').forEach((input) => {
            expect(parseInt(input.attributes('max'), 10)).toEqual(max);
        });
    });

    it('supports the step prop', async () => {
        const step = 5;

        wrapper.setProps({
            step,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.findAll('input').forEach((input) => {
            expect(parseInt(input.attributes('step'), 10)).toEqual(step);
        });
    });
});
