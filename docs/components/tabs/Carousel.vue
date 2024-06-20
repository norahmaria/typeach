<!-- #region snippet -->
<template>
  <PeachyTabs.Tabs
    v-model:tab="slide"
    :interval="3000"
    follow-focus
    data-carousel="true">
    <PeachyTabs.Title>Carousel</PeachyTabs.Title>

      <PeachyTabs.List>
        <PeachyTabs.ListItem id="carousel-zero">
          Slide 0
        </PeachyTabs.ListItem>
            
        <PeachyTabs.ListItem id="carousel-one">
          Slide 1
        </PeachyTabs.ListItem>

        <PeachyTabs.ListItem id="carousel-two">
          Slide 2
        </PeachyTabs.ListItem>
      </PeachyTabs.List>

      <div class="target-wrapper">
        <PeachyTabs.NavigationButton
          to="previous"
          aria-label="Previous slide">
          <ChevronLeftSvg />
        </PeachyTabs.NavigationButton>
    
        <TransitionGroup name="tabs"> 
          <PeachyTabs.Panel
            v-show="slide == 'carousel-zero'"
            key="carousel-zero"
            id="carousel-zero"
            aria-roledescription="carousel">
            Slide 0 Content
          </PeachyTabs.Panel>
        
          <PeachyTabs.Panel 
            v-show="slide == 'carousel-one'"
            key="carousel-one"
            id="carousel-one"
            aria-roledescription="carousel">
            Slide 1 Content
          </PeachyTabs.Panel>
    
           <PeachyTabs.Panel 
            v-show="slide == 'carousel-two'"
            key="carousel-two"
            id="carousel-two"
            aria-roledescription="carousel">
            Slide 2 Content
          </PeachyTabs.Panel>
        </TransitionGroup>
    
        <PeachyTabs.NavigationButton
          to="next"
          aria-label="Next slide">
          <ChevronRightSvg />
        </PeachyTabs.NavigationButton>
      </div>     
     
      <PeachyTabs.IntervalController>
        <template #pause>
          <PauseSvg />
          Pause carousel
        </template>

        <template #resume>
          <PlaySvg />
          Resume carousel
        </template>
      </PeachyTabs.IntervalController>
  </PeachyTabs.Tabs>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyTabs } from "../../../src";

  import ChevronLeftSvg from "./ChevronLeftSvg.vue";
  import ChevronRightSvg from "./ChevronRightSvg.vue";
  import PauseSvg from "./PauseSvg.vue";
  import PlaySvg from "./PlaySvg.vue";

  const slide = ref("carousel-zero");
</script>
