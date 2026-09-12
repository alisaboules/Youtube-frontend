import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"

type TypeOut = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return { ref, isShow, setIsShow };
}