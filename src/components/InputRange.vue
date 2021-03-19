<template>
    <div class="InputRange">
        <label
            v-if="label"
            v-bind:for="fieldId"
            class="form-label">
            {{ label }}
        </label>
        <div class="row align-items-center">
            <div class="col">
                <input
                    v-bind:id="fieldId"
                    v-model="localModelValue"
                    v-bind:min="min"
                    v-bind:max="max"
                    v-bind:step="step"
                    class="form-range"
                    type="range" />
            </div>
            <div class="col-auto">
                <input
                    v-model="localModelValue"
                    v-bind:min="min"
                    v-bind:max="max"
                    v-bind:step="step"
                    v-bind:aria-label="label"
                    class="form-control InputRange__NumberField"
                    type="number" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
    name: 'InputRange',

    props: {
        modelValue: {
            type: Number,
        },

        label: {
            type: String,
        },

        min: {
            type: Number,
            default: 1,
        },

        max: {
            type: Number,
            default: 100,
        },

        step: {
            type: Number,
            default: 1,
        },
    },

    emits: {
        'update:modelValue': {
            type: Number,
        },
    },

    computed: {
        fieldId () {
            return `input-range-${uuid()}`;
        },

        localModelValue: {
            get () {
                return this.modelValue;
            },

            set (newValue) {
                let castValue = newValue;

                if (Number.isInteger(this.step)) {
                    castValue = parseInt(newValue, 10);
                }
                else {
                    castValue = parseFloat(newValue);
                }

                if (Number.isNaN(castValue)) return;
                if (castValue < this.min) return;
                if (castValue > this.max) return;

                this.$emit('update:modelValue', castValue);
            },
        },
    },
});
</script>

<style lang="scss">
.InputRange {
    &__NumberField.form-control {
        width: 75px;
    }
}
</style>