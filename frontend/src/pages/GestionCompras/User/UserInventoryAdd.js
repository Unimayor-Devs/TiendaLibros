import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, assignInvBookId, editBookAndInventory } from '../../../services/inventoryServices';
import '../../GestionLibros/User/AddBookScreen';
import "./UserInventoryScreen.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'; // Íconos para los botones
import "./UserInventoryScreen.css"
const UserInventoryAdd = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [inventoryData, setInventoryData] = useState({
    invBookId: '',
    invCantStock: '',
    invStatus: 'Disponible',
    invDateAdd: new Date().toISOString().split('T')[0],
  });
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const book = await getBookById(bookId);
        setBookData(book);
        const invBookId = await assignInvBookId(book.type);
        setInventoryData({ ...inventoryData, invBookId });
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'invCantStock' && value < 0) return;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmAdd = window.confirm('¿Está seguro de agregar este libro al inventario?');
    if (confirmAdd) {
      try {
        await editBookAndInventory(bookId, inventoryData);
        alert('Libro agregado al inventario exitosamente');
        navigate('/inventory/books');
      } catch (error) {
        console.error('Error al agregar libro al inventario:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/inventory/books');
  };

  return (
    <div className="form-container">
      <h2>Agregar Libro al Inventario</h2>
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID del Libro</label>
          <input
            type="text"
            name="invBookId"
            value={inventoryData.invBookId}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label>Cantidad en Stock</label>
          <input
            type="number"
            name="invCantStock"
            value={inventoryData.invCantStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            className="form-select"
            name="invStatus"
            value={inventoryData.invStatus}
            onChange={handleChange}
            required
          >
            <option value="Disponible">Disponible</option>
            <option value="Oculto">Oculto</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} /> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInventoryAdd;
