import {product7} from '@app/assets/images';
import {Button, Icon, ProductTagIndicator, QuantityButton} from '@app/components/atoms';
import {LabeledInput} from '@app/components/molecules';
import {SelectionSheet, UnitSheet, VariantsSelectionSheet} from '@app/components/organisms';
import {useOrderTypes, useProductById} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {CartItem, MainStackParamList, OrderTypeDTO, ProductVariantDTO, UnitDto} from '@app/types';
import {generateVariantPlaceholder, getProductUnitByUnit, getVariantsByUnitId, numberUtils} from '@app/utils';
import {initialPreviewProductForm, PreviewProductFormType, ProductPreviewSchema} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import lodash from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// ————————————————————————————————————————————————
// 📦 Props and Setup
// ————————————————————————————————————————————————
type Props = StackScreenProps<MainStackParamList, 'ProductView'>;

export const ProductView: React.FC<Props> = ({route}) => {
  // ————————————————————————————————————————————————
  // 🔗 Params
  // ————————————————————————————————————————————————
  const {id, cartItem} = route.params;
  const isUpdate = !!cartItem;

  // ————————————————————————————————————————————————
  // 🔗 Refs
  // ————————————————————————————————————————————————
  const unitSheetRef = useRef<TrueSheet>(null);
  const variantsRef = useRef<TrueSheet>(null);
  const orderTypeSheetRef = useRef<TrueSheet>(null);
  const formRef = useRef<FormikProps<PreviewProductFormType>>(null);
  const priceRef = useRef<number>(0);

  // ————————————————————————————————————————————————
  // 📡 Data Fetching
  // ————————————————————————————————————————————————
  const {data} = useProductById(id);
  const {data: orderTypes} = useOrderTypes();

  // ————————————————————————————————————————————————
  // 🧠 Data Transformation
  // ————————————————————————————————————————————————
  const {name, description, category, product_units = [], product_variants = [], base_unit_id} = data || {};

  const unitsDto: UnitDto[] = product_units.map(pu => pu.unit);
  const baseUnit = product_units.find(u => u.unit_id === base_unit_id);
  const baseUnitPrice = baseUnit?.price ?? 0;
  const hasVariants = product_variants.length > 0;
  const totalVariants = hasVariants ? product_variants.length : product_units.length;

  // ————————————————————————————————————————————————
  // 🎛 State
  // ————————————————————————————————————————————————
  const [selectedUnit, setSelectedUnit] = useState<UnitDto>();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>();
  const [selectedVariants, setSelectedVariants] = useState<ProductVariantDTO[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState(orderTypes?.[0]);
  const [price, setPrice] = useState<number>(baseUnitPrice);
  const {bottom} = useSafeAreaInsets();

  const unitHasVariants = selectedUnit ? selectedVariants.length > 0 : false;

  // Generate display text for selected variant options
  const variantPlaceholder = generateVariantPlaceholder(selectedOptions || {});

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  /**
   * Automatically selects an order type when the list of order types is available.
   */
  useEffect(() => {
    if (!orderTypes) return;

    setSelectedOrderType(orderTypes[0]);
    setFieldValue('order_type', orderTypes[0]);
  }, [orderTypes]);

  /**
   * Automatically selects a unit when the list of units is available.
   * Prefers the unit from the cart item if present; otherwise, selects the base unit.
   */
  useEffect(() => {
    if (unitsDto.length && !selectedUnit) {
      if (cartItem) {
        setSelectedUnit(cartItem.unit.unit);
        return;
      }

      setSelectedUnit(baseUnit?.unit);
    }
  }, [unitsDto, cartItem]);

  useEffect(() => {
    if (!cartItem) return;

    if (cartItem.note) setFieldValue('note', cartItem.note);
    if (cartItem.quantity) setFieldValue('quantity', cartItem.quantity);
    if (!lodash.isEmpty(cartItem.selectecVariantOptions)) {
      setSelectedOptions(cartItem.selectecVariantOptions);
      setFieldValue('variant', cartItem.variant);
      const localPrice = cartItem.variant?.price ?? 0;

      priceRef.current = localPrice;
      setPrice(localPrice);
    } else {
      const localPrice = cartItem.unit.price;
      priceRef.current = localPrice;
      setPrice(localPrice);
    }

    if (cartItem.order_type) {
      const orderType = orderTypes?.find(o => o.id === cartItem.order_type?.id);
      setSelectedOrderType(orderType);
      setFieldValue('order_type', orderType);
    }
  }, [cartItem]);

  /**
   * Updates the selected product variants whenever the selected unit changes.
   * Retrieves all variants matching the selected unit's ID.
   */
  useEffect(() => {
    const variants = getVariantsByUnitId(product_variants, selectedUnit?.id ?? 0);
    if (variants.length > 0) {
      setSelectedVariants(variants);

      return;
    }

    const localProductUnit = getProductUnitByUnit(product_units, selectedUnit);
    if (!localProductUnit) return;
    const localPrice = localProductUnit.price;
    priceRef.current = localPrice;

    // Reset selected variants when there are no variants for the selected unit
    setSelectedVariants([]);
  }, [selectedUnit, unitHasVariants]);

  /**
   * Sync selected unit to Formik's product_unit field.
   */
  useEffect(() => {
    if (!selectedUnit) return;
    const unit = getProductUnitByUnit(product_units, selectedUnit);
    setFieldValue('product_unit', unit);
  }, [selectedUnit]);

  /**
   * Sync product price from the product data to the state
   */
  useEffect(() => {
    if (!isUpdate) setPrice(baseUnitPrice);
  }, [baseUnitPrice, isUpdate]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————

  /** Toggle product description visibility */
  const toggleDescription = () => setIsDescriptionExpanded(prev => !prev);

  /** Handle unit selection and close sheet */
  const handleSelectUnit = (unit: UnitDto) => {
    const productUnit = getProductUnitByUnit(product_units, unit);
    const unitPrice = productUnit?.price ?? 0;

    setPrice(unitPrice);
    priceRef.current = unitPrice;
    setSelectedUnit(unit);
    setTimeout(() => unitSheetRef.current?.dismiss(), 500);
  };

  /** Submit form via Formik ref */
  const handleAddTocartSubmitted = () => {
    formRef.current?.submitForm();

    setTimeout(() => {
      const errors = formRef.current?.errors;
      if (errors && Object.keys(errors).length > 0) {
        Toast.show({
          type: 'error',
          text1: 'Please fill all required fields',
        });
      }
    }, 300);
  };

  /**
   * Add item to cart with form data.
   */
  const handleFormSubmit = (formData: PreviewProductFormType) => {
    const currentFormData: CartItem = {
      product: data!!,
      quantity: formData.quantity!!,
      unit: formData.product_unit!!,
      variant: formData.variant,
      selectecVariantOptions: selectedOptions,
      price: priceRef.current,
      note: formData.note,
      order_type: formData.order_type,
    };

    if (isUpdate) {
      useCartStore.getState().updateItem(cartItem, currentFormData);
    } else {
      useCartStore.getState().addItem(currentFormData);
    }

    Toast.show({
      type: 'success',
      text1: 'Product added to cart successfully 🎉',
    });
  };

  /**
   * Handle variant selection from sheet and sync with Formik.
   */
  const handleVariantSelected = (variant: ProductVariantDTO, options: Record<string, string>, localPrice: number) => {
    setPrice(localPrice);
    setSelectedOptions(options);
    setFieldValue('variant', variant);
    priceRef.current = localPrice;
    setTimeout(() => variantsRef.current?.dismiss(), 500);
  };

  /**
   * Safely set Formik field value with correct type.
   */
  const setFieldValue = <T extends keyof PreviewProductFormType>(field: T, value: PreviewProductFormType[T]) => {
    formRef.current?.setFieldValue(field, value);
  };

  const handleSelectOrderType = (selectedItems: OrderTypeDTO[]) => {
    setSelectedOrderType(selectedItems[0]);
    setFieldValue('order_type', selectedItems[0]);
  };

  // ————————————————————————————————————————————————
  // 🧱 UI Rendering
  // ————————————————————————————————————————————————

  return (
    <View className="flex-1 bg-white">
      {/* Header Image */}
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom: 25}}
        bottomOffset={25}
        showsVerticalScrollIndicator={false}>
        <View className="flex-row">
          <Image className="w-full h-[350px]" source={product7} />
        </View>

        {/* Product Details */}
        <View className="p-4">
          {/* Title & Price */}
          <View className="flex-row items-center justify-between">
            <View className="gap-1.5">
              <Text className="text-xl text-gray-800 font-semibold">{name}</Text>
              <View className="flex-row items-center gap-3">
                <ProductTagIndicator icon="deployed_code_update" value={totalVariants} />
                <View className="bg-gray-300 w-[1px] h-[10px] rounded-full" />
                <View className="flex-row items-center gap-1">
                  <Icon name="sell" size={14} color={colors.gray[500]} />
                  <Text className="text-sm text-gray-500">{category?.name}</Text>
                </View>
              </View>
            </View>

            <Text className="text-xl font-medium text-orange-500">Rp{numberUtils.toDecimal(price)}</Text>
          </View>

          {/* Expandable Description */}
          <View className="mt-8">
            <TouchableOpacity onPress={toggleDescription} activeOpacity={0.7} className="flex-row items-center gap-1">
              <Icon
                name={isDescriptionExpanded ? 'chevron_down' : 'chevron_right'}
                size={16}
                color={colors.gray[500]}
              />
              <Text className="text-sm text-gray-600">Description</Text>
            </TouchableOpacity>

            {isDescriptionExpanded && (
              <Pressable onPress={toggleDescription}>
                <View className="mt-4">
                  <Text className="text-base text-gray-800">{description}</Text>
                </View>
              </Pressable>
            )}
          </View>

          {/* Product Configuration Form */}
          <Formik
            innerRef={formRef}
            initialValues={initialPreviewProductForm}
            validationSchema={ProductPreviewSchema(unitHasVariants)}
            validateOnMount={false}
            enableReinitialize
            onSubmit={handleFormSubmit}>
            {({values, handleChange}) => {
              return (
                <View className="mt-6 gap-2">
                  {/* Order Type (Placeholder) */}
                  <LabeledInput
                    isClickableOnly
                    onPress={() => orderTypeSheetRef.current?.present()}
                    trailingIcon="chevron_right"
                    label="Tipe order"
                    placeholderTextColor={selectedOrderType ? colors.gray[800] : undefined}
                    placeholder={selectedOrderType ? selectedOrderType.label : 'Pilih tipe order'}
                  />

                  {/* Unit & Variant Selection */}
                  <View className="flex-row gap-2">
                    <LabeledInput
                      isClickableOnly
                      onPress={() => unitSheetRef.current?.present()}
                      trailingIcon="chevron_right"
                      label="Satuan"
                      placeholder={selectedUnit ? selectedUnit.name : 'Pilih satuan'}
                      placeholderTextColor={selectedUnit ? colors.gray[800] : undefined}
                    />
                    <LabeledInput
                      isClickableOnly
                      disabled={!unitHasVariants}
                      onPress={() => variantsRef.current?.present()}
                      trailingIcon="chevron_right"
                      label="Variasi"
                      placeholderTextColor={variantPlaceholder ? colors.gray[800] : undefined}
                      placeholder={variantPlaceholder || 'Pilih varian'}
                    />
                  </View>

                  {/* Additional Notes */}
                  <LabeledInput
                    onChange={handleChange('note')}
                    icon="description"
                    isTextArea
                    label="Catatan"
                    placeholder="Catatan tambahan"
                    value={values.note}
                  />

                  {/* Quantity Control */}
                  <View className="flex-row">
                    <QuantityButton defaultValue={values.quantity} onChange={qty => setFieldValue('quantity', qty)} />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

      {/* Add to Cart Button */}
      <View className="px-4 pt-4 border-t border-t-gray-100" style={{paddingBottom: bottom + 16}}>
        <Button
          onPress={handleAddTocartSubmitted}
          title={isUpdate ? 'Update Cart' : 'Add to Cart'}
          containerColor={colors.orange[500]}
          textColor={colors.white}
        />
      </View>

      {/* Unit Selector Modal */}
      <UnitSheet
        units={unitsDto}
        ref={unitSheetRef}
        selected={selectedUnit ? [selectedUnit] : []}
        onSelect={handleSelectUnit}
      />

      {/* Variants Selection Modal */}
      <VariantsSelectionSheet
        currentSelectedOptions={selectedOptions}
        onSubmit={handleVariantSelected}
        variants={selectedVariants}
        ref={variantsRef}
      />

      {/* Order Type Selector Modal */}
      <SelectionSheet
        ref={orderTypeSheetRef}
        title="Pilih Tipe Order"
        selected={selectedOrderType ? [selectedOrderType] : []}
        onSelect={handleSelectOrderType}
        items={orderTypes}
      />
    </View>
  );
};
