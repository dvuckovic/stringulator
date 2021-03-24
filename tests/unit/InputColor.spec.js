import { shallowMount } from '@vue/test-utils';
import InputColor from '@/components/InputColor';

describe('InputColor', () => {
    let wrapper;

    it('renders the passed value', () => {
        const modelValue = '#ff0000';

        wrapper = shallowMount(InputColor, {
            props: {
                modelValue,
            },
        });

        wrapper.findAll('input').forEach((input) => {
            expect(input.element.value).toEqual(modelValue);
        });
    });

    it('updates the passed value', async () => {
        const modelValue = '#00ff00';

        wrapper.setProps({
            modelValue,
        });

        await wrapper.vm.$nextTick(() => {});

        wrapper.findAll('input').forEach((input) => {
            expect(input.element.value).toEqual(modelValue);
        });
    });

    it('emits the update event on input change', () => {
        const modelValue = '#0000ff';

        wrapper.find('input[type="color"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([ modelValue ]);
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
        expect(wrapper.find('input[type="color"]').attributes('id')).toEqual(fieldId);
    });
});
