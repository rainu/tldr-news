<template>
  <v-text-field
      :label="label"
      :value="modelValue"
      :type="type"
      :append-inner-icon="type === 'password' ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="toggleType"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change')"/>
</template>

<script>
export default {
  name: "Secret",

  props: [ 'modelValue', 'label' ],

  data() {
    return {
      type: "password"
    }
  },
  methods: {
    toggleType() {
      if(this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}

</script>