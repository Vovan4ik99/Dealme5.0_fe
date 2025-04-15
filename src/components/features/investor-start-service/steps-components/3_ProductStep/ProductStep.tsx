import React, {FC, useCallback, useContext, useState} from 'react';
import styles
    from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/MainTaskActivityStep.module.scss";
import StartServiceItemList from "@ui/investor-start-service/StartServiceItemList/StartServiceItemList.tsx";
import addProductImage from "@icons/start_service/add_product_image.svg";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import StartServiceItem from "@ui/investor-start-service/StartServiceItem/StartServiceItem.tsx";
import StartServiceModalHead from "@ui/investor-start-service/StartServiceModalHead/StartServiceModalHead.tsx";
import ProductModal
    from "@components/features/investor-start-service/steps-components/3_ProductStep/product-modal/ProductModal.tsx";
import {ModalContext} from "@context/ModalContext/ModalContext.ts";
import { IProductItem } from "@shared/start-service/investorStartServiceTypes.ts";
import {
    IStartServiceComponentProps
} from "@components/features/investor-start-service/ServiceManager/ServiceManagerTypes.ts";
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";
import {prePareProductResponse} from "@utils/investorServiceUtils.ts";

const ProductStep: FC<IStartServiceComponentProps> = ({onSubmit, userData}) => {
    const { openModal } = useContext(ModalContext);
    const { deleteProduct } = useInvestorStartService();

    const [ products, setProducts ] = useState<IProductItem[]>(prePareProductResponse(userData))

    const handleSubmit =(productToAdd: IProductItem) => {
        setProducts((prev) => [...prev, productToAdd]);
    }

    const handleEdit = (productToEdit: IProductItem, id: number) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === id ? { id: id, ...productToEdit } : p
            )
        )
    }

    const handleDelete = (item: IProductItem) => {
        setProducts((p) => p!.filter(product => item.id !== product.id));

        deleteProduct(item.id!)
            .then()
            .catch(console.error);
    }

    const onProductAdd = () => {
        openModal({
            id: 'AddProducts',
            title: (
                <StartServiceModalHead title={"Dodaj produkt"}/>
            ),
            child: <ProductModal mode={"add"}
                                 onSubmit={ handleSubmit } />,
            withSaveBtn: true,
            btnWithIcon: true,
            shouldCloseOnSaving: false,
            btnText: "Dodaj produkt"
        });
    }

    const onProductEdit = (item: IProductItem) => {
        openModal({
            id: 'EditProducts',
            title: (
                <StartServiceModalHead title={"Edytuj produkt"}/>
            ),
            child: <ProductModal mode={"edit"}
                                 onSubmit={ handleEdit }
                                 currentProduct={ item }/>,
            withSaveBtn: true,
            btnWithIcon: true,
            shouldCloseOnSaving: false,
            btnText: "Edytuj produkt"
        });
    }

    const renderProducts = useCallback (() => {
        return products.map((item) => {
            let area = item.country || item.city || item.state;
            if (area === "POLAND") {
                area = "Polska";
            }
            return (
                <StartServiceItem title={item.name}
                                  description={[item.subIndustry,
                                                item.sector,
                                                item.buyerPerson,
                                                area!]}
                                  onDelete={() => handleDelete(item) }
                                  onEdit={ () => onProductEdit(item) }
                                  key={item.id}/> )
        })}, [ products, setProducts ]);

    return (
        <main>
            <div className={ styles["step__head"] }>
                <h2 className={ styles["step__title"] }>
                    Teraz zdefiniuj produkty, które sprzedajesz aby przypisać je do usług
                </h2>
                <div className={ styles["step__tip"] }>
                    <InfoIcon/>
                    <p>
                        Pamiętaj: dane które teraz podasz zostaną zapisane na twoim koncie i będziesz mógł je wykorzystać przy definiowaniu kolejnych usług
                    </p>
                </div>
            </div>
            <StartServiceItemList items={ renderProducts() }
                                  isLastPage={ true }
                                  addingMoreBtn={ "Dodaj kolejny produkt" }
                                  boldEmptyInfo={ "Nie masz jeszcze dodanych produktów." }
                                  btnText={ "Dodaj produkt" }
                                  emptyInfo={ "Dodaj produkty aby przejdź dalej" }
                                  onEmptyImg={ addProductImage }
                                  onAdd={ onProductAdd }
                                  onSubmit={ () => onSubmit() }/>
        </main>
    );
};

export default ProductStep;
