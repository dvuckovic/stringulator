<template>
    <div class="col">
        <input
            v-bind:id="fieldId"
            v-model="localModelValue"
            class="form-control form-control-color"
            type="color" />
    </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    name: 'InputColor',

    props: {
        modelValue: {
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
};
</script>
