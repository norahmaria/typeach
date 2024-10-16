<template>
  <PeachyTree.Tree :count="3">
    <PeachyTree.Item
      id="project"
      :position="1"
      :selected="selection.includes('project')"
      @toggle="() => selected.toggleItem('project')">
      <unicon name="angle-right" aria-hidden="true" />

      <PeachyTree.ItemIndicator
        :data-indeterminate="indeterminate('project', selection)">
        <unicon v-if="selection.includes('project')" name="check" />
        <template v-else-if="indeterminate('project', selection)">-</template>
      </PeachyTree.ItemIndicator>

      <PeachyTree.ItemLabel class="tree-branch-title">
        Projects

        <PeachyVisuallyHidden v-if="indeterminate('project', selection)">
          Has children selected.
        </PeachyVisuallyHidden>
      </PeachyTree.ItemLabel>

      <template #children>
        <PeachyTree.Tree :count="2">
          <PeachyTree.Item
            id="project-1"
            :position="1"
            :selected="selection.includes('project-1')"
            disabled
            @toggle="() => selected.toggleItem('project-1')">
            <unicon name="file-blank" aria-hidden="true" />

            <PeachyTree.ItemIndicator>
              <unicon name="check" />
            </PeachyTree.ItemIndicator>

            <PeachyTree.ItemLabel class="tree-item-title">
              Project 1
            </PeachyTree.ItemLabel>
          </PeachyTree.Item>

          <PeachyTree.Item
            id="project-2"
            :position="2"
            :selected="selection.includes('project-2')"
            @toggle="() => selected.toggleItem('project-2')">
            <unicon name="angle-right" aria-hidden="true" />

            <PeachyTree.ItemIndicator
              :data-indeterminate="indeterminate('project-2', selection)">
              <unicon v-if="selection.includes('project-2')" name="check" />
              <template v-else-if="indeterminate('project-2', selection)">
                -
              </template>
            </PeachyTree.ItemIndicator>

            <PeachyTree.ItemLabel class="tree-branch-title">
              Project 2

              <PeachyVisuallyHidden
                v-if="indeterminate('project-2', selection)">
                Has children selected.
              </PeachyVisuallyHidden>
            </PeachyTree.ItemLabel>

            <template #children>
              <PeachyTree.Tree :count="1">
                <PeachyTree.Item
                  id="sub-1"
                  :position="1"
                  :selected="selection.includes('sub-1')"
                  @toggle="() => selected.toggleItem('sub-1')">
                  <unicon name="file-blank" aria-hidden="true" />

                  <PeachyTree.ItemIndicator>
                    <unicon name="check" />
                  </PeachyTree.ItemIndicator>

                  <PeachyTree.ItemLabel class="tree-item-title">
                    Project 2.1
                  </PeachyTree.ItemLabel>
                </PeachyTree.Item>
              </PeachyTree.Tree>
            </template>
          </PeachyTree.Item>
        </PeachyTree.Tree>
      </template>
    </PeachyTree.Item>

    <PeachyTree.Item
      id="file-1"
      :position="2"
      :selected="selection.includes('file-1')"
      @toggle="() => selected.toggleItem('file-1')">
      <unicon name="file-blank" aria-hidden="true" />

      <PeachyTree.ItemIndicator>
        <unicon name="check" />
      </PeachyTree.ItemIndicator>

      <PeachyTree.ItemLabel class="tree-item-title">
        File 1
      </PeachyTree.ItemLabel>
    </PeachyTree.Item>

    <PeachyTree.Item
      id="letters"
      :position="3"
      :selected="selection.includes('letters')"
      @toggle="() => selected.toggleItem('letters')">
      <unicon name="angle-right" />

      <PeachyTree.ItemIndicator
        :data-indeterminate="indeterminate('letters', selection)">
        <unicon v-if="selection.includes('letters')" name="check" />
        <template v-else-if="indeterminate('letters', selection)">-</template>
      </PeachyTree.ItemIndicator>

      <PeachyTree.ItemLabel class="tree-branch-title">
        Letters

        <PeachyVisuallyHidden v-if="indeterminate('letters', selection)">
          Has children selected.
        </PeachyVisuallyHidden>
      </PeachyTree.ItemLabel>

      <template #children>
        <PeachyTree.Tree :count="2">
          <PeachyTree.Item
            id="letter-1"
            :position="1"
            :selected="selection.includes('letter-1')"
            @toggle="() => selected.toggleItem('letter-1')">
            <unicon name="file-blank" aria-hidden="true" />

            <PeachyTree.ItemIndicator>
              <unicon name="check" />
            </PeachyTree.ItemIndicator>

            <PeachyTree.ItemLabel class="tree-item-title">
              Letter 1
            </PeachyTree.ItemLabel>
          </PeachyTree.Item>
        </PeachyTree.Tree>
      </template>
    </PeachyTree.Item>
  </PeachyTree.Tree>
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  import {
    PeachyTree,
    PeachyVisuallyHidden,
    useSelectionIdArray,
  } from "typeach";

  const selected = useSelectionIdArray(false);

  const selection = computed(() => selected.selectedIds.value);

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
          children: [
            {
              id: "sub-1",
            },
          ],
        },
      ],
    },

    {
      id: "file-1",
    },

    {
      id: "letters",
      children: [
        {
          id: "letter-1",
        },
      ],
    },
  ];
</script>

<style src="./tree.css" />
