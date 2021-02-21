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
        let modelValue = '#0000ff';

        wrapper.find('input[type="color"]').setValue(modelValue);

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([modelValue]);
    });
});
