import { useRouter } from "vue-router";

export const useChangeView = () => {
  const router = useRouter();

  const changeView = (path: string) => {
    router.push(path);
  };

  return {
    changeView,
  };
};
