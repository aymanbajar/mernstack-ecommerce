import { useTranslation } from "react-i18next";

export interface Props {
  _id?: string;
  title?: string;
  image?: string;
  price?: number;
}

export default function ProductCart({ _id, title, image, price }: Props) {
    const {t, i18n} = useTranslation();

  return (
    <div className="p-4 border border-gray-400 rounded-lg flex flex-col gap-4 items-center ">
      {/* image */}
      <div className="w-64 h-64 sm:w-32 sm:h-32 md:h-48 lg:h-64 flex items-center justify-center">
        <img  src={image} alt="product image" />
      </div>
      {/* product details */}
      <div className="p-2">
        {/* product name */}
        <div>{title}</div>
        {/* product price */}
        <div>{price} $</div>
      </div>
      {/* add to cart button */}
      <div>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" 
        >
          {t('Add to cart')}
        </button>
      </div>
    </div>
  );
}