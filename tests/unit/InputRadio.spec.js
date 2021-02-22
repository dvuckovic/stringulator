import { shallowMount } from '@vue/test-utils';
import InputRadio from '@/components/InputRadio';

describe('InputRadio', () => {
    let wrapper;

    it('renders the passed value', () => {
        const modelValue = 'foo';
        const option = 'foo';

        wrapper = shallowMount(InputRadio, {
            props: {
                modelValue,
                option,
            }
        });

        expect(wrapper.find('input').element.checked).toBe(true);
    });

    it('updates the passed value', async () => {
        const modelValue = 'bar';

        wrapper.setProps({
            modelValue,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('emits the update event on input change', async () => {
        const option = 'foo';

        wrapper.setProps({
            option,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.find('input[type="radio"]').setValue(true);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([option]);
    });

    it ('supports the label prop', async () => {
        expect(wrapper.find('label').exists()).toBe(false);

        const label = 'Foo bar';

        wrapper.setProps({
            label,
        });

        await wrapper.vm.$nextTick(() => {});

        expect(wrapper.find('label').text()).toEqual(label);
    });

    it ('renders the label element', () => {
        const labelElement = wrapper.find('label');

        expect(labelElement.exists()).toEqual(true);

        const fieldId = labelElement.attributes('for');

        expect(fieldId).not.toBeUndefined();
        expect(wrapper.find('input[type="radio"]').attributes('id')).toEqual(fieldId);
    });
});
