import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
type Props = {
  items: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};
const Pagination = ({
  items,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const maxPages = Math.ceil(items / itemsPerPage);
  const maxPageNumbersToShow = 5;
  const getNumbersPages = () => {
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, maxPages);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };
  const pages = getNumbersPages();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex w-full justify-center items-center text-xl py-2 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={previousPage}
        className="disabled:opacity-50 hover:text-green-800 text-green-700"
      >
        <IoIosArrowDropleftCircle className="text-4xl ss:text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl" />
      </button>
      {pages.map((number, index) => (
        <button
          type="button"
          key={index}
          className={` px-2 py-0 xs:px-4 xs:py-2 rounded-full  hover:text-green-700 hover:bg-green-200 ${
            number === currentPage
              ? "bg-green-700 text-white"
              : "text-green-700 "
          }`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === maxPages}
        onClick={nextPage}
        className="disabled:opacity-50 hover:text-green-800 text-green-700"
      >
        <IoIosArrowDroprightCircle className="text-4xl ss:text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl" />
      </button>
    </div>
  );
};

export default Pagination;
