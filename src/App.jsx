import { useState } from "react";

import espada from "./assets/espada.png";
import escudo from "./assets/escudo.png";
import pocao from "./assets/pocao.png";
import arco from "./assets/arco.png";
import capacete from "./assets/capacete.png";
import chave from "./assets/chave.png";

import "./App.css";

const coisinhas = [
  {
    id: 1,
    nome: "espada",
    imagem: espada,
    slot: 0,
  },
  {
    id: 2,
    nome: "escudo",
    imagem: escudo,
    slot: 1,
  },
  {
    id: 3,
    nome: "poção",
    imagem: pocao,
    slot: 2,
  },
];

const itensDisponiveis = [
  {
    id: 4,
    nome: "arco",
    imagem: arco,
  },
  {
    id: 5,
    nome: "capacete",
    imagem: capacete,
  },
  {
    id: 6,
    nome: "chave",
    imagem: chave,
  },
];

const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [itens, setItens] = useState(coisinhas);
  const [itemArrastado, setItemArrastado] = useState(null);

  function handleDrag(id) {
    setItemArrastado(id);
  }

  function handleDrop(slotDestino) {
    if (itemArrastado === null) return;

    setItens((estadoAtual) => {
      const itemArrastadoAtual = estadoAtual.find(
        (item) => item.id === itemArrastado
      );

      const itemDestino = estadoAtual.find(
        (item) => item.slot === slotDestino
      );

      if (!itemArrastadoAtual) return estadoAtual;

      if (itemDestino) {
        return estadoAtual.map((item) => {
          if (item.id === itemArrastado) {
            return {
              ...item,
              slot: itemDestino.slot,
            };
          }

          if (item.id === itemDestino.id) {
            return {
              ...item,
              slot: itemArrastadoAtual.slot,
            };
          }

          return item;
        });
      }

      return estadoAtual.map((item) => {
        if (item.id === itemArrastado) {
          return {
            ...item,
            slot: slotDestino,
          };
        }

        return item;
      });
    });

    setItemArrastado(null);
  }

  function handleDropFora() {
    if (itemArrastado === null) return;

    setItens((estadoAtual) => {
      return estadoAtual.filter(
        (item) => item.id !== itemArrastado
      );
    });

    setItemArrastado(null);
  }

  function adicionarItem(item) {
    const slotLivre = slots.find(
      (slot) =>
        !itens.some((itemAtual) => itemAtual.slot === slot)
    );

    if (slotLivre === undefined) return;

    const novoItem = {
      ...item,
      id: Date.now(),
      slot: slotLivre,
    };

    setItens((estadoAtual) => [
      ...estadoAtual,
      novoItem,
    ]);
  }

  return (
    <main className="container">

      <header>
        <h1>mochilinha</h1>

        <p className="subtitulo">
          organize os itens arrastadinhos eles
        </p>
      </header>

      <section className="itens-disponiveis">

        <h2>Outros itens disponiveis:</h2>

        <div className="lista-itens">

          {itensDisponiveis.map((item) => (
            <img
              key={item.id}
              src={item.imagem}
              alt={item.nome}
              onClick={() => adicionarItem(item)}
            />
          ))}

        </div>

      </section>

      <section
        className="inventario"
        onDragOver={(e) => e.preventDefault()}
      >

        {slots.map((slot) => {

          const item = itens.find(
            (item) => item.slot === slot
          );

          return (
            <div
              key={slot}
              className="slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(slot)}
            >

              {item && (
                <img
                  src={item.imagem}
                  alt={item.nome}
                  draggable
                  onDragStart={() => handleDrag(item.id)}
                />
              )}

            </div>
          );

        })}

      </section>

      <div
        className="lixeira"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropFora}
      >
        Arraste para aqui para excluir
      </div>

    </main>
  );
}

export default App;