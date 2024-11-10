import tensorflow as tf
from keras._tf_keras.keras.applications import ResNet50
from keras._tf_keras.keras.layers import Dense, GlobalAveragePooling2D
from keras._tf_keras.keras.models import Model
from keras._tf_keras.keras.preprocessing.image import ImageDataGenerator
import numpy as np
from keras._tf_keras.keras.preprocessing import image

def prepare_validation_data():
    test_datagen = ImageDataGenerator(rescale=1. / 255)

    test_generator = test_datagen.flow_from_directory(
        'C:\\Users\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\data',  # Путь к данным для валидации
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        shuffle=False
    )

    return test_generator

def create_model():
    base_model = ResNet50(weights='imagenet', include_top=False)

    for layer in base_model.layers:
        layer.trainable = False

    #классификатор
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dense(2, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=x)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def prepare_data():
    #генератор обучения с аугментацией
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=40,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    #генератор тестирования без аугментации
    test_datagen = ImageDataGenerator(rescale=1./255)

    train_generator = train_datagen.flow_from_directory(
        'C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\data\\train',  #путь к обучающим
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    test_generator = test_datagen.flow_from_directory(
        'C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\data\\validation',  #путь к тестовым
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    return train_generator, test_generator

def train_model(model, train_generator, test_generator):
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        epochs=10,
        validation_data=test_generator,
        validation_steps=test_generator.samples // test_generator.batch_size
    )
    return history

def evaluate_model(model, test_generator):
    score = model.evaluate(test_generator, steps=test_generator.samples // test_generator.batch_size)
    print(f"Test loss: {score[0]}")
    print(f"Test accuracy: {score[1]}")

def predict_image(model, img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)#размерность  батча
    img_array = img_array / 255.0

    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)
    print(f"Predicted class: {predicted_class[0]}")

def save_model(model):
    model.save('resnet_model.h5')
    print("Model saved!")

def main():
    #модель
    model = create_model()

    #подготовка данных
    train_generator, test_generator = prepare_data()

    #обучение
    train_model(model, train_generator, test_generator)

    #оценка
    evaluate_model(model, test_generator)

    #cохранение модели
    save_model(model)

if __name__ == "__main__":
    main()