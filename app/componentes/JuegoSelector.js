'use client'

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JuegoSelector = () => {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState('Juego 1');

  const handleJuegoChange = (e) => {
    setJuegoSeleccionado(e.target.value);
  };

  const renderTabla = () => {
    switch (juegoSeleccionado) {
      case 'Juego 1':
        return (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Obed</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Daniel</td>
                </tr>
                <tr>
                  <td className="text-center">Victor</td>
                  <td className="text-center"></td>
                  <td className="text-center">Frenky</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Emilio</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Memo</td>
                </tr>
                <tr>
                  <td className="text-center">Alan</td>
                  <td className="text-center"></td>
                  <td className="text-center">Yuyu</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Juego 2':
        return (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Obed</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Emilio</td>
                </tr>
                <tr>
                  <td className="text-center">Daniel</td>
                  <td className="text-center"></td>
                  <td className="text-center">Memo</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Victor</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Alan</td>
                </tr>
                <tr>
                  <td className="text-center">Frenky</td>
                  <td className="text-center"></td>
                  <td className="text-center">Yuyu</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Juego 3':
        return (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Obed</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Alan</td>
                </tr>
                <tr>
                  <td className="text-center">Frenky</td>
                  <td className="text-center"></td>
                  <td className="text-center">Memo</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="3" className="text-center">Cancha 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Victor</td>
                  <td className="text-center">VS</td>
                  <td className="text-center">Emilio</td>
                </tr>
                <tr>
                  <td className="text-center">Daniel</td>
                  <td className="text-center"></td>
                  <td className="text-center">Yuyu</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Juego 4':
            return (
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="3" className="text-center">Cancha 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">Obed</td>
                      <td className="text-center">VS</td>
                      <td className="text-center">Victor</td>
                    </tr>
                    <tr>
                      <td className="text-center">Emilio</td>
                      <td className="text-center"></td>
                      <td className="text-center">Alan</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="3" className="text-center">Cancha 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">Daniel</td>
                      <td className="text-center">VS</td>
                      <td className="text-center">Frenky</td>
                    </tr>
                    <tr>
                      <td className="text-center">Memo</td>
                      <td className="text-center"></td>
                      <td className="text-center">Yuyu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
      case 'Juego 5':
                return (
                  <div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th colSpan="3" className="text-center">Cancha 1</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">Obed</td>
                          <td className="text-center">VS</td>
                          <td className="text-center">Daniel</td>
                        </tr>
                        <tr>
                          <td className="text-center">Alan</td>
                          <td className="text-center"></td>
                          <td className="text-center">Yuyu</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th colSpan="3" className="text-center">Cancha 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">Victor</td>
                          <td className="text-center">VS</td>
                          <td className="text-center">Frenky</td>
                        </tr>
                        <tr>
                          <td className="text-center">Memo</td>
                          <td className="text-center"></td>
                          <td className="text-center">Emilio</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
      case 'Juego 6':
            return (
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="3" className="text-center">Cancha 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">Obed</td>
                      <td className="text-center">VS</td>
                      <td className="text-center">Victor</td>
                    </tr>
                    <tr>
                      <td className="text-center">Memo</td>
                      <td className="text-center"></td>
                      <td className="text-center">Yuyu</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="3" className="text-center">Cancha 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">Daniel</td>
                      <td className="text-center">VS</td>
                      <td className="text-center">Frenky</td>
                    </tr>
                    <tr>
                      <td className="text-center">Emilio</td>
                      <td className="text-center"></td>
                      <td className="text-center">Alan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
      case 'Juego 7':
        return (
            <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th colSpan="3" className="text-center">Cancha 1</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center">Obed</td>
                    <td className="text-center">VS</td>
                    <td className="text-center">Frenky</td>
                </tr>
                <tr>
                    <td className="text-center">Yuyu</td>
                    <td className="text-center"></td>
                    <td className="text-center">Memo</td>
                </tr>
                </tbody>
            </table>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th colSpan="3" className="text-center">Cancha 2</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center">Victor</td>
                    <td className="text-center">VS</td>
                    <td className="text-center">Daniel</td>
                </tr>
                <tr>
                    <td className="text-center">Emilio</td>
                    <td className="text-center"></td>
                    <td className="text-center">Alan</td>
                </tr>
                </tbody>
            </table>
            </div>
        );
      case 'Juego 8':
        return (
            <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th colSpan="3" className="text-center">Cancha 1</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center">Victor</td>
                    <td className="text-center">VS</td>
                    <td className="text-center">Emilio</td>
                </tr>
                <tr>
                    <td className="text-center">Frenky</td>
                    <td className="text-center"></td>
                    <td className="text-center">Memo</td>
                </tr>
                </tbody>
            </table>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th colSpan="3" className="text-center">Cancha 2</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center">Obed</td>
                    <td className="text-center">VS</td>
                    <td className="text-center">Alan</td>
                </tr>
                <tr>
                    <td className="text-center">Daniel</td>
                    <td className="text-center"></td>
                    <td className="text-center">Yuyu</td>
                </tr>
                </tbody>
            </table>
            </div>
        );
            default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <label htmlFor="juegoSelect" className="form-label">Selecciona un juego</label>
          <select className="form-select" id="juegoSelect" value={juegoSeleccionado} onChange={handleJuegoChange}>
            <option value="Juego 1">Juego 1</option>
            <option value="Juego 2">Juego 2</option>
            <option value="Juego 3">Juego 3</option>
            <option value="Juego 4">Juego 4</option>
            <option value="Juego 5">Juego 5</option>
            <option value="Juego 6">Juego 6</option>
            <option value="Juego 7">Juego 7</option>
            <option value="Juego 8">Juego 8</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          {renderTabla()}
        </div>
      </div>
    </div>
  );
};

export default JuegoSelector;
