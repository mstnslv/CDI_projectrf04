
<template>
  <div class="dropdown-checkboxes ninput">
    <div class="ninput_line" @click="toggleDropdown">
      <slot name="icon" />
      <button type="button">
        {{ buttonText }}
      </button>
<!--      <IconDrop
          class="icn icn_drop"
          v-show="!showDrop"
          @click="onIconDropClick"
      />-->
      <IconDrop/>
    </div>

    <div v-if="isDropdownOpen" class="dropdown-content ninput_drop">
      <div class="ninput_drop__line" v-for="(item, index) in items" :key="index">
        <label>
          <input type="checkbox" v-model="selectedItems[index]" @change="updateButtonText" />
          <span>{{ item.label }}</span>
        </label>
      </div>

    </div>

  </div>
</template>

<script>
import IconDrop from "../icons/IconDrop.vue";
export default {
  name: "DropDownCheckBoxes",
  components: {IconDrop},
  data() {
    return {
      isDropdownOpen: false,
      //items: ["Item 1", "Item 2", "Item 3"], // Замените на ваши элементы
      selectedItems: Array(this.items.length).fill(false), // Инициализация значений чекбоксов
    };
  },
  computed: {
    buttonText() {
      if (this.allSelected()) {
        return this.defaultText + " - все";
      }
      const selected = this.selectedItems

          .map((isChecked, index) => (isChecked ? this.items[index].label : null))
          .filter(Boolean);
      return selected.length > 0 ? selected.join(", ") : this.defaultText;
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    updateButtonText() {
      if (this.allSelected()) {
        this.isDropdownOpen = false;
      }
    },
    allSelected() {
      return this.selectedItems.every((isChecked) => isChecked);
    },
    handleDocumentClick(event) {
      if (!this.$el.contains(event.target)) {
        // Клик был выполнен вне dropdown-content, скрываем его
        this.isDropdownOpen = false;
      }
    },
  },
  props:{
    items: {
      type: Array,
      required: true,
    },
    defaultText: {
      type: String,
      default: "Выберите", // Значение по умолчанию, если не передано другое значение
    },
    clearTime:{
      type: Number,
      default: 0
    },
    modelValue:{
      type: Array,
      default: () => []
    }
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  watch:{
    selectedItems: {
      handler: function (val) {
        this.$emit('update:modelValue', val.map((isChecked, index) => (isChecked ? this.items[index].value : null)).filter(Boolean));
      },
      deep: true
    },
    clearTime(){
      this.selectedItems = Array(this.items.length).fill(false);
    }
  },
  created() {
    if(this.modelValue.length>0){
      this.selectedItems = this.items.map((item) => this.modelValue.includes(item.value));
    }
  }

};
</script>

<style lang="scss">
@import "/src/style/style_vars.scss";




input[type="checkbox"] {
  margin-right: 8px;
}

</style>