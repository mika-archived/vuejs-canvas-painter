<template>
  <main class="flex">
    <v-stage
      @mousedown="onMouseDown"
      @touchstart="onMouseDown"
      @mouseup="onMouseUp"
      @touchend="onMouseUp"
      @mousemove="onMouseMove"
      @touchmove="onMouseMove"
      class="centering"
      ref="stage"
      :config="config"
    >
      <v-layer ref="layer" />
    </v-stage>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import Konva from "konva";

const config = reactive({
  width: window.innerWidth - 60,
  height: window.innerHeight - 60,
});

const mode = ref<"draw" | "erase">("draw");
const isPainting = ref<boolean>(false);
const lastDrawLine = ref<Konva.Line | undefined>(undefined);
const stage = ref<Konva.Stage | undefined>(undefined);
const layer = ref<Konva.Layer | undefined>(undefined);

onMounted(() => {});

const onMouseDown = (event: MouseEvent) => {
  isPainting.value = true;

  const position = stage.value!.getStage().getPointerPosition();
  if (position === null) return;

  lastDrawLine.value = new Konva.Line({
    stroke: "#ffffff",
    strokeWidth: 4,
    globalCompositeOperation:
      mode.value === "draw" ? "source-over" : "destination-out",
    lineCap: "round",
    lineJoin: "round",
    points: [position.x, position.y, position.x, position.y],
  });

  layer.value!.getStage().add(lastDrawLine.value! as any);
};

const onMouseUp = (event: MouseEvent) => {
  isPainting.value = false;
};

const onMouseMove = ({ evt }: Konva.KonvaEventObject<MouseEvent>) => {
  if (!isPainting.value) {
    return;
  }

  evt.preventDefault();

  const position = stage.value!.getStage().getPointerPosition();
  if (position === null) return;

  const newPoints = lastDrawLine
    .value!.points()
    .concat([position.x, position.y]);
  lastDrawLine.value!.points(newPoints);
};
</script>

<style>
.flex {
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
