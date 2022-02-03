<template>
  <q-header bordered class="bg-dark text-white q-pa-xs">
    <q-toolbar>
      <q-toolbar-title class="text-center">
         <slot>Name</slot>
         </q-toolbar-title>
      <div class="icon"> 
        <slot name="action" >
          <q-icon name="fas fa-biohazard" />
        </slot>
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.icon {
  position: absolute;
  font-size: 18px;
  right: 10px;
}
</style>