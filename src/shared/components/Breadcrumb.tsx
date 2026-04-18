import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const category = searchParams.get("cat");

  return (
    <div className="flex items-center gap-1 uppercase text-sm font-semibold text-gray-500 flex-wrap">
      <Link to="/">Home</Link>

      {pathnames.map((segment, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <div key={routeTo} className="flex items-center gap-1">
            <FiChevronRight />

            {isLast ? (
              <span>{segment}</span>
            ) : (
              <Link to={routeTo}>{segment}</Link>
            )}
          </div>
        );
      })}

      {category && (
        <>
          <FiChevronRight />
          <span>{category}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
