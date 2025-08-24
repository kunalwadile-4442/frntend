/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import InputField from './InputField';
import { calculateTotal, formatIfFloat, formatTwoDigit, roundToFixed } from '../../utils/common';
import { App_url, ValidateForm } from '../../utils/constants/static';
import DropdownSelect from './DropSelect';
import Icon from './Icon';
import { usePosterReducers } from '../../redux/getdata/usePostReducer';

const SaleProductItem = (props) => {
  const {
    index,
    control,
    register,
    setValue,
    watch,
    removeProduct,
    isEditSaleDistribution,
    errors,
    Serial,isQBProducts=true,
    isSellingPrice=true,
    isSellingSalePrice=true,
    isBuyingPrice=true,
    isMargin=true,
  } = props;
    const {productUnitService,products} = usePosterReducers();
  const qty = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_qty`);
  const price = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_buy_price`);
  const seller_price = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`);
  const margin = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`);
  
  useEffect(() => {
    const dataTotal = calculateTotal(price, formatTwoDigit(qty), margin, seller_price);
    
    if (dataTotal) {
      if (dataTotal.total !== undefined && seller_price >= price) {
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`, dataTotal.total != "NaN" ? (roundToFixed(dataTotal.total,2)):dataTotal.total);
      }
      if (dataTotal.seller_price && seller_price) {
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`, dataTotal.seller_price != "NaN"  ? formatIfFloat(dataTotal.seller_price):dataTotal.seller_price);
      }
      if (dataTotal.product_margin && seller_price) {
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, dataTotal.product_margin != "NaN" ? formatIfFloat(dataTotal.product_margin) :dataTotal.product_margin);
      }
    }
  }, []);

  const onChange = (e) => {


    let newQty = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_qty`);
    let buyPrice = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_buy_price`);
    let newSellerPrice = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`);
    let newMargin = watch(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`);
    if(isSellingPrice){

      if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_qty`) {
      newQty = e.value;
    }
    if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_buy_price`) {
      buyPrice = e.value;
    }
    if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`) {
      newSellerPrice = e.value;
    }
    if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`) {
      newMargin = e.value;
    }

    if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin` && buyPrice >0) {
      newSellerPrice = formatIfFloat(buyPrice * (1 + newMargin / 100));
    }else{
      setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, '');
    }
    let total = 0;
    if (parseFloat(newSellerPrice || 0) > parseFloat(buyPrice || 0) && newQty > 0) {
      total = formatTwoDigit(newQty) * parseFloat(newSellerPrice)
      if(buyPrice >0){
        newMargin = formatIfFloat(((newSellerPrice / buyPrice) - 1) * 100);
        if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`) {
          setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`, newSellerPrice);
        } else {
          setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, newMargin);
        }
      }else{
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, '');
      }
      setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`, roundToFixed(total,2));
    } else {
      setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`, "");
      if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`) {
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, "");
      }
      if (e.name === `${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`) {
        setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`, "");
      }
    }
  }
    else if(isSellingSalePrice){
      const total:any=parseFloat(seller_price)*parseFloat(newQty)
      
      if(!isNaN(total))
      setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`,roundToFixed(total,2));
    else
    setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`,null);
    }
    else if (isBuyingPrice){
      const total:any=(parseFloat(buyPrice)*parseFloat(newQty))
      if(!isNaN(total))
      setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`,roundToFixed(total,2))
    else
    setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`,null);

    }
  };

  const unitOptions = [
    { label: "LB", value: "LB" },
    { label: "Pcs", value: "pcs" },
    { label: "Tons", value: "tons" },
  ];

  function  callQBId(e){
    setValue(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.qb_product_name`,e?.qb_name)
  }

  return (
    <tr>
      {Serial()}
      {isQBProducts&&<td style={{ width: 180, minWidth: 190 }}>
      <DropdownSelect
              control={control}
              name={`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.qb_product_id`}
              options={products?.quickbookOptions}
              onSelect={callQBId}
              placeholder="Product"
              errors={!isQBProducts?errors?.product_list?.[index]?.qb_product_id:errors?.inquiry_sale_products?.[index]?.qb_product_id}
              required
              rules={ValidateForm.required("Product")}
              setValue={setValue}
            />
      </td>}
      <td className='min-w-[150px]'>
        <InputField
          placeholder="Product Name"
          inputClassName="h-10 rounded-md"
          register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_name`, ValidateForm.textWithMaxLength("Product Name", 255))}
          error={!isQBProducts?errors?.product_list?.[index]?.product_name:errors?.inquiry_sale_products?.[index]?.product_name}
          required
          disabled={isEditSaleDistribution}
          onBlur={props?.callHandleCall}
        />
      </td>
      <td className='min-w-[150px]'>
        <InputField
          placeholder="Qty"
          inputClassName="h-10 rounded-md"
          register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_qty`,  ValidateForm.quantityNumber("Quantity"))}
          required
          disabled={isEditSaleDistribution}
          error={!isQBProducts?errors?.product_list?.[index]?.product_qty:errors?.inquiry_sale_products?.[index]?.product_qty}
          onChange={onChange}
          onBlur={props?.callHandleCall}
        />
      </td>
      <td style={{ minWidth: 160 }}>
        {isEditSaleDistribution? (
            <InputField
              placeholder="Unit"
              inputClassName="rounded-md"
              register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_unit`, ValidateForm?.textWithMaxLength("Unit", 255))}
              required
              disabled={isEditSaleDistribution}
            onBlur={props?.callHandleCall}
          />
        ):(
            <DropdownSelect
              control={control}
              name={`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_unit_id`}
              options={productUnitService?.optionList || unitOptions}
              placeholder="Unit"
              errors={!isQBProducts?errors?.product_list?.[index]?.product_unit_id:errors?.inquiry_sale_products?.[index]?.product_unit_id}
              required
              rules={ValidateForm.required("Unit")}
              name_key={`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_unit`}
              setValue={setValue}
              onSelect={props?.callHandleCall}
              
            />
        )}
      </td>
      {isBuyingPrice&&<td style={{ minWidth: 80 }}>
        <InputField
          placeholder="Buying Price"
          inputClassName="h-10 rounded-md"
          register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_buy_price`, ValidateForm.buying_price)}
          required
        //   disabled={isEditSaleDistribution}
          onChange={onChange}
          error={!isQBProducts?errors?.product_list?.[index]?.product_buy_price:errors?.inquiry_sale_products?.[index]?.product_buy_price}
          onBlur={props?.callHandleCall}
          />
      </td>}
      {isSellingPrice&&<td style={{ minWidth: 80 }}>
        <InputField
          placeholder="Seller Price"
          inputClassName="h-10 rounded-md"
          register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.seller_price`, isBuyingPrice ? ValidateForm.seller_price(price):ValidateForm.Number4Digit("Seller Price"))}
          required
          error={!isQBProducts?errors?.product_list?.[index]?.seller_price:errors?.inquiry_sale_products?.[index]?.seller_price}
          onChange={onChange}
          onBlur={props?.callHandleCall}
          />
      </td>}
      {(isMargin)&&<td style={{ minWidth: 125 }}>
        <InputField
          placeholder="Margin"
          inputClassName="h-10 rounded-md"
          register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.product_margin`, ValidateForm.margin)}
          required
          error={!isQBProducts?errors?.product_list?.[index]?.product_margin:errors?.inquiry_sale_products?.[index]?.product_margin}
          onChange={onChange}
          onBlur={props?.callHandleCall}
          />
      </td>}
      <td className='min-w-[150px]'>
        <div className="flex justify-center gap-4 items-center">
          <InputField
            placeholder="Total Price"
            className="w-full"
            inputClassName="h-10 rounded-md"
            register={register(`${!isQBProducts?'product_list':'inquiry_sale_products'}.${index}.total_price`)}
            disabled
            onBlur={props?.callHandleCall}
          />
        {!isEditSaleDistribution&& (
          <button
            type="button"
            className="text-red-500 "
            onClick={() => removeProduct(index)}
          >
            <Icon image attrIcon={App_url.image.cancel} className="sm" />
          </button>
        )}
        </div>
      </td>
    </tr>
  );
};

export default SaleProductItem;
