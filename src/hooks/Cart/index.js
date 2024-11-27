import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Função para adicionar itens ao carrinho
    const addCart = async ({ id, imagemproduto, name, especificacaoproduto, precoproduto, quantity = 1, value }) => {
        setCart((prevItens) => {
            const itemExistente = prevItens.find(item => item.id === id);

            if (itemExistente) {
                // Se o item já existe, atualiza a quantidade
                return prevItens.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Se não existe, adiciona o novo item com a quantidade fornecida
                return [...prevItens, { id, imagemproduto, name, especificacaoproduto, precoproduto, quantity, value }];
            }
        });
    };

    // Função para remover itens do carrinho
    const removeCart = async ({ id }) => {
        setCart((prevItens) => {
            const itemExistente = prevItens.find(item => item.id === id);

            if (!itemExistente) {
                return prevItens; // Retorna o carrinho atual se o item não for encontrado
            }

            if (itemExistente.quantity === 1) {
                // Se a quantidade é 1, remove o item do carrinho
                return prevItens.filter(item => item.id !== id);
            }

           
            return prevItens.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };


    const adicionarCart = async ({ id, amount = 1 }) => {
        setCart((prevItens) => {
            const itemExistente = prevItens.find(item => item.id === id);

            if (itemExistente) {
                // Se o item já existe, atualiza a quantidade
                return prevItens.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                );
            }

            // Se o item não existe, não faz nada
            return prevItens;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addCart, removeCart, adicionarCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizado para usar o contexto do carrinho
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}