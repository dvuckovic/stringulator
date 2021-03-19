<template>
    <div class="form-floating">
        <label
            v-if="label"
            v-bind:for="fieldId"
            class="form-label">
            {{ label }}
        </label>
        <input
            v-bind:id="fieldId"
            v-model="localModelValue"
            class="form-control form-control-color"
            type="color" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
    name: 'InputColor',

    props: {
        modelValue: {
            type: String,
        },

        label: {
            type: [String, Number],
        },
    },

    emits: {
        'update:modelValue': {
            type: String,
        },
    },

    computed: {
        fieldId () {
            return `input-color-${uuid()}`;
        },

        localModelValue: {
            get () {
                return this.modelValue;
            },

            set (modelValue) {
                this.$emit('update:modelValue', modelValue);
            },
        },
    },
});
</script>

<style lang="scss">
.form {
    &-floating {
        & > label {
            padding: 0;
            width: 100%;
            text-align: center;
            max-width: 3rem;
            line-height: 2.2rem;
        }

        & > .form-control {
            height: auto;
            padding: 0.375rem;

            &:not(:placeholder-shown) {
                padding-top: 0.375rem;
                padding-bottom: 0.375rem;
            }
        }
    }
}
</style>