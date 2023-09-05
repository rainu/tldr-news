<template>
  <h3>{{value.Title}}</h3>
  <v-table fixed-header height="512px">
    <thead v-if="value.Header">
      <tr>
        <th v-for="(cell, i) of value.Header.Cells" :key="i">
          {{cell}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) of value.Body" :key="i" :class="columnCount !== row.Cells.length ? 'subheader' : ''">
        <td v-for="(cell, j) of row.Cells" :key="j" :colspan="columnCount !== row.Cells.length ? columnCount : 1">
          {{cell}}
        </td>
      </tr>
    </tbody>
    <tfoot v-if="value.Footer">
      <tr>
        <td v-for="(cell, i) of value.Footer.Cells" :key="i" :colspan="columnCount !== value.Footer.Cells.length ? columnCount : 1">
          {{cell}}
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    columnCount() {
      if(this.value.Header) return this.value.Header.Cells.length
      if(this.value.Body.length > 0) return this.value.Body[0].Cells.length
      return 0
    }
  }
}

</script>

<style scoped>
.subheader {
}
</style>