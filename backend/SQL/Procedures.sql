-- ADD NEW APPOINTMENT INFO
CREATE OR REPLACE PROCEDURE ADD_PRESCRIPTION(
                        A_ID IN NUMBER,
                        A_DATE IN VARCHAR2,
                        FORMAT IN VARCHAR2,
                        INPUT_SYMPTOMS IN VARCHAR2,
                        INPUT_WEIGHT IN VARCHAR2,
                        INPUT_BLOOD_PRESSURE IN VARCHAR2,
                        INPUT_HEIGHT IN VARCHAR2,
                        INPUT_HEART_RATE IN VARCHAR2,
                        INPUT_PATIENT_ID IN VARCHAR2,
                        INPUT_DOCTOR_ID IN VARCHAR2,
                        MED_CENTER_NAME IN VARCHAR2 )
IS
    APP_DATE DATE;
    MC_ID VARCHAR2(10);
BEGIN
    APP_DATE := TO_DATE(A_DATE, FORMAT);

    SELECT M.MED_CENTER_ID INTO MC_ID
    FROM MEDICAL_CENTER M
    WHERE M.CENTER_NAME = MED_CENTER_NAME;


    INSERT INTO PAST_APPOINTMENT(APPOINTMENT_ID, APPOINTMENT_DATE, SYMPTOMS, WEIGHT,
                                 BLOOD_PRESSURE, HEIGHT, HEART_RATE, PATIENT_ID,
                                 DOCTOR_ID, MED_CENTER_ID) VALUES
    (A_ID, APP_DATE, INPUT_SYMPTOMS, INPUT_WEIGHT, INPUT_BLOOD_PRESSURE, INPUT_HEIGHT,
     INPUT_HEART_RATE, INPUT_PATIENT_ID, INPUT_DOCTOR_ID, MC_ID);

END;


-- ADD NEW PRESCRIPTION MEDICINES
CREATE OR REPLACE PROCEDURE ADD_MEDICINE(
                                A_ID NUMBER,
                                MED_NAME VARCHAR2,
                                DOSAGE VARCHAR2,
                                FREQUENCY VARCHAR2,
                                INPUT_DURATION VARCHAR2,
                                INPUT_TIMING VARCHAR2
) IS
    MED_ID NUMBER;
BEGIN
    FOR M IN (SELECT MEDICINE_ID
                FROM MEDICINE
                WHERE MEDICINE_NAME = MED_NAME)
    LOOP
        MED_ID := M.MEDICINE_ID;
        EXIT;
    END LOOP;

    IF MED_ID IS NOT NULL AND A_ID IS NOT NULL THEN
        INSERT INTO PRESCRIBED_MEDICINES
                    (APPOINTMENT_ID, MEDICINE_ID, DOSAGE_AMOUNT,
                     DOSAGE_FREQUENCY, DURATION, TIMING)
                    VALUES
                    (A_ID, MED_ID, DOSAGE, FREQUENCY,
                     INPUT_DURATION, INPUT_TIMING);
    END IF;

END;


-- add new prescription diseases
CREATE OR REPLACE PROCEDURE ADD_DISEASES(
                                A_ID IN NUMBER,
                                NAME_DISEASE IN VARCHAR2)
IS
    D_ID NUMBER;
BEGIN
    FOR D IN (SELECT DISEASE_ID
                FROM DISEASE
                WHERE DISEASE_NAME = NAME_DISEASE)
    LOOP
        D_ID := D.DISEASE_ID;
        EXIT;
    END LOOP;

    IF D_ID IS NOT NULL AND A_ID IS NOT NULL THEN
        INSERT INTO DIAGNOSED_DISEASES
                    (APPOINTMENT_ID, DISEASE_ID)
                    VALUES
                    (A_ID, D_ID);
    END IF;
END;



-- add new prescription TESTS
CREATE OR REPLACE PROCEDURE ADD_TESTS(
                                A_ID IN NUMBER,
                                NAME_TEST IN VARCHAR2)
IS
    T_ID NUMBER;
BEGIN
    FOR T IN (SELECT TEST_ID
                FROM MEDICAL_TEST
                WHERE TEST_NAME = NAME_TEST)
    LOOP
        T_ID := T.TEST_ID;
        EXIT;
    END LOOP;

    IF T_ID IS NOT NULL AND A_ID IS NOT NULL THEN
        INSERT INTO SUGGESTED_TESTS (APPOINTMENT_ID, TEST_ID)
        VALUES (A_ID, T_ID);
    END IF;
END;

