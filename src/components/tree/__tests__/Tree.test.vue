<template>
  <button id="prefix">prefix</button>

  <PeachyTree.Tree :count="3" :multi-select="multiSelect">
    <PeachyTree.Item
      id="project"
      :selected="false"
      :position="1"
      @toggle="$emit('toggle', 'project')">
      <PeachyTree.ItemLabel>Projects</PeachyTree.ItemLabel>

      <template #children>
        <PeachyTree.Tree :count="4">
          <PeachyTree.Item
            id="project-1"
            :selected="false"
            :position="1"
            @toggle="$emit('toggle', 'project-1')">
            <PeachyTree.ItemLabel>Project 1</PeachyTree.ItemLabel>
          </PeachyTree.Item>

          <PeachyTree.Item
            id="project-2"
            :selected="false"
            :position="2"
            @toggle="$emit('toggle', 'project-2')">
            <PeachyTree.ItemLabel>Project 2</PeachyTree.ItemLabel>
          </PeachyTree.Item>

          <PeachyTree.Item
            id="project-3"
            :selected="false"
            :position="3"
            @toggle="$emit('toggle', 'project-3')">
            <PeachyTree.ItemLabel>Project 3</PeachyTree.ItemLabel>

            <template #children>
              <PeachyTree.Tree :count="2">
                <PeachyTree.Item
                  id="subproject-1"
                  :selected="false"
                  :position="1"
                  @toggle="$emit('toggle', 'subproject-1')">
                  <PeachyTree.ItemLabel>Subproject 1</PeachyTree.ItemLabel>
                </PeachyTree.Item>

                <PeachyTree.Item
                  id="subproject-2"
                  :selected="false"
                  :position="2"
                  @toggle="$emit('toggle', 'subproject-2')">
                  <PeachyTree.ItemLabel>Subproject 2</PeachyTree.ItemLabel>
                </PeachyTree.Item>
              </PeachyTree.Tree>
            </template>
          </PeachyTree.Item>

          <PeachyTree.Item
            id="project-4"
            :selected="false"
            :position="4"
            @toggle="$emit('toggle', 'project-4')">
            <PeachyTree.ItemLabel>Project 4</PeachyTree.ItemLabel>
          </PeachyTree.Item>
        </PeachyTree.Tree>
      </template>
    </PeachyTree.Item>

    <PeachyTree.Item
      id="machine"
      :selected="false"
      :position="2"
      @toggle="$emit('toggle', 'machine')">
      <PeachyTree.ItemLabel>Machine</PeachyTree.ItemLabel>
    </PeachyTree.Item>

    <PeachyTree.Item
      id="letters"
      :selected="false"
      :position="3"
      @toggle="$emit('toggle', 'letters')">
      <PeachyTree.ItemLabel>Letters</PeachyTree.ItemLabel>

      <template #children>
        <PeachyTree.Tree id="letter-1" :count="2">
          <PeachyTree.Item
            id="letter-1"
            :selected="false"
            :position="1"
            @toggle="$emit('toggle', 'letter-1')">
            <PeachyTree.ItemLabel>Letter 1</PeachyTree.ItemLabel>
          </PeachyTree.Item>

          <PeachyTree.Item
            id="letter-2"
            :selected="false"
            :position="2"
            @toggle="$emit('toggle', 'letter-2')">
            <PeachyTree.ItemLabel>Letter 2</PeachyTree.ItemLabel>
          </PeachyTree.Item>
        </PeachyTree.Tree>
      </template>
    </PeachyTree.Item>
  </PeachyTree.Tree>

  <button id="suffix">suffix</button>
</template>

<script lang="ts" setup>
  import { PeachyTree } from "../";

  export interface TreeTestProps {
    multiSelect?: boolean;
  }

  defineProps<TreeTestProps>();

  defineEmits<{ toggle: [id: string] }>();
</script>

<style>
  [aria-expanded="true"] {
    background-color: rgb(161, 161, 161);
  }

  .peachy-tree__item-indicator {
    width: 1rem;
    height: 1rem;
    background-color: #dedede;
  }

  .peachy-tree__item-indicator[data-selected="true"] {
    background-color: green;
  }
</style>
