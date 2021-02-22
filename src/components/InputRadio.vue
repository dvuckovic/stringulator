<template>
    <div class="form-check form-check-inline">
        <input
            v-bind:id="fieldId"
            v-model="localModelValue"
            v-bind:value="option"
            class="form-check-input"
            type="radio" />
        <label
            v-if="label"
            v-bind:for="fieldId"
            class="form-check-label">
            {{ label }}
        </label>
    </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    name: 'InputRadio',

    props: {
        modelValue: {
            type: String,
        },

        option: {
            type: String,
        },

        label: {
            type: String,
        },
    },

    emits: {
        'update:modelValue': {
            type: String,
        },
    },

    computed: {
        fieldId () {
            return `input-radio-${uuid()}`;
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
};
</script>
