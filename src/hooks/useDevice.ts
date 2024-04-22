import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

interface Device {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
}

const calcDevices = (width: number): Device => {
  const isMobile = width < 426;
  const isDesktop = width >= 769;
  const isTablet = !isDesktop && !isMobile;
  return { isMobile, isTablet, isDesktop };
};

const useDevice = () => {
  const windowInnerWidth = window.innerWidth;
  let devices: Ref<Device> = ref(calcDevices(windowInnerWidth));

  const handleResize = (e: any) => {
    devices.value = calcDevices(e.target.innerWidth);
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    devices,
  };
};

export default useDevice;
