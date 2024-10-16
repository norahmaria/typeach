<template>
  <PeachyTree.Tree :count="2">
    <PeachyTree.Item
      id="project"
      :position="1"
      :selected="selection.includes('project')"
      @toggle="() => selected.toggleItem('project')"
      @open="loadProjects">
      <LoadingSvg
        v-if="isLoading"
        aria-hidden="true"
        class="tree-loading-icon" />
      <ChevronSvg v-else aria-hidden="true" />

      <PeachyTree.ItemIndicator
        :data-indeterminate="indeterminate('project', selection)">
        <template v-if="indeterminate('project', selection)">-</template>
        <CheckboxSvg v-else />
      </PeachyTree.ItemIndicator>

      <PeachyTree.ItemLabel class="tree-branch-title">
        Projects

        <PeachyVisuallyHidden role="status" aria-live="polite">
          <template v-if="isLoading">Projects loading</template>
          <template v-else-if="projects.length">Projects loaded</template>
        </PeachyVisuallyHidden>

        <PeachyVisuallyHidden v-if="indeterminate('project', selection)">
          Has children selected.
        </PeachyVisuallyHidden>
      </PeachyTree.ItemLabel>

      <template #children>
        <PeachyTree.Tree
          v-if="projects.length && !isLoading"
          :count="projects.length">
          <PeachyTree.Item
            v-for="(project, i) in projects"
            :key="project.id"
            :id="project.id"
            :position="i + 1"
            :selected="selection.includes(project.id)"
            @toggle="() => selected.toggleItem(project.id)">
            <DocumentSvg aria-hidden="true" />

            <PeachyTree.ItemIndicator>
              <CheckboxSvg />
            </PeachyTree.ItemIndicator>

            <PeachyTree.ItemLabel class="tree-item-title">
              {{ project.label }}
            </PeachyTree.ItemLabel>
          </PeachyTree.Item>
        </PeachyTree.Tree>
      </template>
    </PeachyTree.Item>

    <PeachyTree.Item
      id="file-1"
      :position="2"
      :selected="selection.includes('file-1')"
      @toggle="() => selected.toggleItem('file-1')">
      <DocumentSvg aria-hidden="true" />

      <PeachyTree.ItemIndicator>
        <CheckboxSvg />
      </PeachyTree.ItemIndicator>

      <PeachyTree.ItemLabel class="tree-item-title">
        File 1
      </PeachyTree.ItemLabel>
    </PeachyTree.Item>
  </PeachyTree.Tree>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";

  import {
    PeachyTree,
    PeachyVisuallyHidden,
    useSelectionIdArray,
  } from "typeach";

  // import ChevronSvg from "./ChevronSvg.vue";
  // import DocumentSvg from "./DocumentSvg.vue";
  // import CheckboxSvg from "./CheckboxSvg.vue";
  // import LoadingSvg from "./LoadingSvg.vue";

  const selected = useSelectionIdArray(false);

  const selection = computed(() => selected.selectedIds.value);

  const projects = ref<{ id: string; label: string }[]>([]);

  const isLoading = ref(false);

  const unloadProjects = () => {
    isLoading.value = false;
    projects.value = [];
  };

  const loadProjects = () => {
    isLoading.value = true;

    setTimeout(() => {
      projects.value = [
        {
          label: "Project 1",
          id: "project-1",
        },

        {
          label: "Project 2",
          id: "project-2",
        },
      ];

      isLoading.value = false;
    }, 2500);
  };

  const indeterminate = (id: string, selection: string[]) => {
    return selection
      .map(_id => {
        const path = [...getNodePath(tree, _id)].flat();

        return path.includes(id);
      })
      .some(isChild => !!isChild);
  };

  function* getNodePath(
    tree: Tree[],
    id: string,
    path: string[] = []
  ): Generator<string[]> {
    for (const node of tree) {
      if (node.id === id) {
        yield path;
      }

      if (node.children) {
        yield* getNodePath(node.children, id, [...path, node.id]);
      }
    }
  }

  interface Tree {
    id: string;
    children?: Tree[];
  }

  const tree: Tree[] = [
    {
      id: "project",
      children: [
        {
          id: "project-1",
        },

        {
          id: "project-2",
        },
      ],
    },

    {
      id: "file-1",
    },
  ];
</script>
