<script setup>
  import IconDrop from "../icons/IconDrop.vue";
  import IconClear from "../icons/IconClear.vue";
  import {computed, ref, watch} from "vue";
  import IconSearch from "../icons/IconSearch.vue";

  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputmode: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['update:modelValue']);

  let searchData = computed(() => {
    return props.options?.map((item) => {
      return { text: item.label.toLowerCase(), ...item };
    });
  });
  let filter = ref('');
  watch(filter, (val) => {
    hasChanges.value = true;
  });
  let filteredOptions = computed(() => {
    let text = filter.value.toLowerCase();
    return searchData.value.filter((item) => {
      //console.log(item.text, text, item.text.includes(text));
      if(!hasChanges.value) return true;
      return item.text.includes(text);
    }).sort((a,b) => {
      if(a.value === null) return -1;
      if(b.value === null) return 1;
      if(a.isTop && !b.isTop) return -1;
      if(!a.isTop && b.isTop) return 1;
      return 0;
    });
  });

  let showDrop = ref(false);
  let lastItem = ref(null);
  const inputClick = () => {
    showDrop.value = true;
    hasChanges.value = false;
  };

  let itemClick = (item) => {
    //console.log(item);
    if(item.value === null){
      filter.value = '';
      lastItem.value = null;
      showDrop.value = false;
      emits('update:modelValue', null);
      return;
    }
    filter.value = item.label;
    showDrop.value = false;
    lastItem.value = item;
    emits('update:modelValue', item.value);
  };

  let onClear = () => {
    filter.value = '';
    hasChanges.value = false;
    //emits('update:modelValue', null);
    //showDrop.value = false;
  };
  const onIconDropClick = () => {
    if(props.disabled) return;
    showDrop.value = true;
    hasChanges.value = false;
  };
  let hasChanges = ref(false);


  watch(() => props.options, (val) => {
    filter.value = '';
    lastItem.value = null;

    //console.log(props.modelValue)
    if(props.options && props.modelValue){
      let item = props.options.find((item) => item.value === props.modelValue);
      if(item) {
        filter.value = item.label;
      }
    }
  });

  const onClickOutside = () => {
     showDrop.value = false;
    if(lastItem.value) {
      filter.value = lastItem.value.label;
    }
  }


  if(props.options && props.modelValue){
    let item = props.options.find((item) => item.value === props.modelValue);
    if(item) {
      filter.value = item.label;
    }
  }

  watch(() => props.modelValue, (val) => {

    if(val === null){
      filter.value = '';
      lastItem.value = null;
    } /*else {
      let item = props.options.find((item) => item.value === val);
      if(item) {
        filter.value = item.label;
      }
    }*/
  },{deep:true});


</script>

<template>

  <div class="ninput" v-click-outside-v2="onClickOutside" :class="{'disabled':disabled}">


    <div class="ninput_line">
      <slot name="icon" />
      <input
          type="search"
          autocomplete="off"
          :placeholder="placeholder"
          :inputmode="inputmode"
          @click.prevent="inputClick"
          v-model="filter"
          :disabled="disabled"
      >
      <IconDrop
          class="icn icn_drop"
          v-show="!showDrop"
          @click="onIconDropClick"
      />
      <IconClear
          class="icn icn_clear"
          v-show="showDrop && filter!==''"
          @click.prevent="onClear"
      />
      <IconSearch
          class="icn icn_search"
          v-show="showDrop && filter===''"
      />
    </div>

    <div class="ninput_drop" v-show="showDrop" >

        <div v-for="(item,index) in filteredOptions"
             :key="index"
             class="ninput_drop__line"
             :class="{'marked':item.isTop===true}"
             @click="itemClick(item)">
          <span>
            {{item?.label}}
          </span>
          <span>
            {{item?.count}}
          </span>
        </div>




    </div>


  </div>

</template>