import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service, compact = false }) => {
  const {
    id,
    icon: Icon,
    title,
    description,
    cardBg,
    fee,
    processingTime,
  } = service;

  /* ================= COMPACT CARD ================= */
  if (compact) {
    return (
      <Link
        to={`/services/${id}`}
        className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200
                   transition-all duration-300
                   hover:border-green-500 hover:shadow-md bg-white"
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center
                     bg-white transition-all duration-300
                     group-hover:bg-green-600"
        >
          <Icon
            size={22}
            className="text-green-600 transition-colors duration-300
                       group-hover:text-white"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 marathi-text truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-500 marathi-text truncate">
            {description}
          </p>
        </div>

        {/* Hover Arrow */}
        <ArrowRight
          size={18}
          className="text-gray-400 transition-all duration-300
                     group-hover:text-green-600 group-hover:translate-x-1"
        />
      </Link>
    );
  }

  /* ================= FULL CARD ================= */
  return (
    <div
      className={`group rounded-2xl p-6 border border-gray-200
                  transition-all duration-300
                  hover:border-green-500 hover:-translate-y-1 hover:shadow-lg
                  ${cardBg}`}
    >
      {/* Icon */}
      <div className="mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center
                     bg-white transition-all duration-300
                     group-hover:bg-green-600"
        >
          <Icon
            size={26}
            className="text-green-600 transition-colors duration-300
                       group-hover:text-white"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 marathi-text">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 marathi-text line-clamp-2">
        {description}
      </p>

      {/* Fee + Time */}
      {/* <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className="marathi-text">
          शुल्क:{" "}
          <strong className="text-gray-700">
            {fee === 0 ? "मोफत" : `₹${fee}`}
          </strong>
        </span>
        <span className="marathi-text">
          वेळ:{" "}
          <strong className="text-gray-700">
            {processingTime}
          </strong>
        </span>
      </div> */}

      {/* Hover-only Action */}
      <Link
        to={`/services/${id}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-green-600
                   opacity-0 translate-y-1 transition-all duration-300
                   group-hover:opacity-100 group-hover:translate-y-0 marathi-text"
      >
        अधिक माहिती
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default ServiceCard;
