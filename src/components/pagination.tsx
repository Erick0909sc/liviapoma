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
const Pagination = ({ items, itemsPerPage, currentPage, setCurrentPage }: Props) => {

  const maxPages = Math.ceil(items / itemsPerPage);
  const maxPageNumbersToShow = 5
  const getNumbersPages = () => {
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, maxPages);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
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
        className="disabled:opacity-50 hover:text-indigo-800 text-indigo-700"
      >
        <IoIosArrowDropleftCircle className="text-5xl" />
      </button>
      {pages.map((number, index) =>
        <button type="button"
          key={index}
          className={`px-4 py-2 rounded-full hover:text-indigo-700 hover:bg-indigo-200 ${number === currentPage ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
          onClick={() => setCurrentPage(number)}>
          {number}
        </button>)}
      <button
        disabled={currentPage === maxPages}
        onClick={nextPage}
        className="disabled:opacity-50 hover:text-indigo-800 text-indigo-700"
      >
        <IoIosArrowDroprightCircle className="text-5xl" />
      </button>
    </div>
  );
};

export default Pagination;