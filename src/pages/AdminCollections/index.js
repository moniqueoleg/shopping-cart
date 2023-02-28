import { useState, useEffect } from 'react';

import { useCollection } from 'hooks/useCollection';
import { useAdmin } from 'hooks/useAdmin';

import Loader from 'components/Loader';
import CenterModal from 'components/CenterModal';
import ConfirmMessage from 'components/ConfirmMessage';

import ProductCard from 'components/ProductCard';

import styles from './index.module.scss';

const AdminCollections = () => {
  const { getCollection } = useCollection();
  const { deleteVariant } = useAdmin();

  const [variants, setVariants] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [productToBeDeleted, setProductToBeDeleted] = useState(null);

  useEffect(() => {
    if (!variants) {
      const fetchVariants = async () => {
        const fetchedVariants = await getCollection();
        setVariants(fetchedVariants);
      };

      fetchVariants();
    }
  }, [variants]);

  const handleDeleteStart = ({ productId, variantId }) => {
    setProductToBeDeleted({ productId, variantId });
    setIsConfirmOpen(true);
  };

  const handleDeleteOnConfirm = async () => {
    await deleteVariant(productToBeDeleted);

    setVariants(null);
    setIsConfirmOpen(false);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setProductToBeDeleted(null);
  };

  // Agregar filter de categorias para admin
  useEffect(() => {}, []);

  return (
    <>
      <CenterModal toggleModal={closeConfirm}>
        {isConfirmOpen && (
          <ConfirmMessage
            isConfirmOpen={isConfirmOpen}
            handleConfirm={handleDeleteOnConfirm}
            handleCancel={closeConfirm}
            text="Are you sure you want to delete this variant? If product only has this variant, the whole product will be deleted."
          />
        )}
      </CenterModal>
      {!variants && <Loader />}
      {variants && (
        <section>
          <div className={`${styles.container} main-container`}>
            <h1>Admin Products/Variants</h1>
            <div className={styles.products_wrapper}>
              {variants.map((variant) => (
                <ProductCard
                  key={variant.variantId}
                  variantId={variant.variantId}
                  productId={variant.productId}
                  model={variant.model}
                  color={variant.color}
                  colorDisplay={variant.colorDisplay}
                  currentPrice={variant.currentPrice}
                  actualPrice={variant.actualPrice}
                  type={variant.type}
                  slug={variant.slug}
                  imageTop={variant.images[0]}
                  imageBottom={variant.images[1]}
                  numberOfVariants={variant.numberOfVariants}
                  handleDeleteStart={handleDeleteStart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminCollections;
