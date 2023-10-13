import { IUser } from "@/shared/types";
import { useMemo } from "react";
import { useAppDispatch } from "@/states/store";
import { setCurrentPage } from "@/states/globalSlice";
const useSearchUsers = (arr: IUser[], filterString: string) => {
  const dispatch = useAppDispatch();
  const filteredArray = useMemo(() => {
    if (filterString.trim() === "") {
      return arr;
    } else {
      dispatch(setCurrentPage(1));
      const lowerFilterString = filterString.toLowerCase();
      return arr.filter((item) => {
        const itemName = item.name.toLowerCase();
        const itemEmail = item.email.toLowerCase();
        const itemRole = item.role.toLowerCase();
        return (
          itemName.includes(lowerFilterString) ||
          itemEmail.includes(lowerFilterString) ||
          itemRole.includes(lowerFilterString)
        );
      });
    }
  }, [arr, filterString]);

  return filteredArray;
};

export default useSearchUsers;
