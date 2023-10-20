import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_URL = 'https://your-energy.b.goit.study/api/exercises';

const ref = {
    openModalBtn: document.querySelector('.openModalBtn'),
    addFavoriteButton: document.querySelector('.add-favorite'),
    giveRatingButton: document.querySelector('.give-rating'),
    exerciseList: document.querySelector('.exercise'),
    modal: document.getElementById('outerModal'),
};

const { addFavoriteButton, giveRatingButton, openModalBtn, exerciseList, modal } = ref;

function openExerciseModal() {
  const exerciseID = '64f389465ae26083f39b17bc'; // ID вправи
  fetchExerciseData(exerciseID)
    .then(data => {
      const exerciseMarkup = createExerciseMarkup(data);
      exerciseList.innerHTML = exerciseMarkup;
    });

  modal.style.display = 'block';
}

// Додавання обробника події для кнопки "Відкрити модальне вікно"
openModalBtn.addEventListener('click', openExerciseModal);

async function fetchExerciseData(exerciseID) {
  try {
    const response = await axios.get(`${API_URL}/${exerciseID}`);
    return response.data;
  } catch (error) {
    console.error('Помилка запиту до API:', error);
    return null;
  }
}

function createExerciseMarkup(data) {
  if (data) {
    const {
      bodyPart,
      _id,
      equipment,
      name,
      target,
      description,
      rating,
      burnedCalories,
      time,
    popularity,
      gifUrl,
    } = data;

    return `<div class='exercise-wrap' data-id='${_id}'>
        <h2 class='exercise-list__title'>${name}</h2>
            <img class='exercise-list__img'
              src='${gifUrl}'
              alt='foto'
              loading='lazy'
            />
    <div class="rating" >
        <div class="rating_body">
        <div class="rating_active"></div>    
        <div class="rating_items"></div>     
</div>  
    <div class="rating_value" >rating: ${rating}</div>  
    </div>
        <p>bodyPart: ${bodyPart}</p>
        <p>equipment: ${equipment}</p>
        <p>target: ${target}</p>
        <p>description: ${description}</p>
        <p>burnedCalories: ${burnedCalories}</p>
        <p>popularity: ${popularity}</p>
        <p>description:${description}</p>
    </div>`;
  }
  
}