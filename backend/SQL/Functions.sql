-- RETURNS NULL FOR EMPTY STRING
CREATE OR REPLACE FUNCTION GET_NULL(PARAM IN VARCHAR2)
RETURN VARCHAR2 IS
BEGIN
    IF PARAM = '' THEN
        RETURN NULL;
    end if;

    RETURN PARAM;
END;



-- SEARCH THE ADDRESS_ID, IF NONE THEN CREATE NEW ADDRESS
CREATE OR REPLACE FUNCTION GET_ADD_ID(
    STREET IN VARCHAR2,
    CITY_NAME IN VARCHAR2,
    POST IN VARCHAR2,
    SUB IN VARCHAR2,
    DIS IN VARCHAR2
)
RETURN NUMBER IS
    ID NUMBER;
BEGIN
    ID := -1;

    SELECT A.ADDRESS_ID INTO ID
    FROM ADDRESS A
    WHERE A.STREET_ADDRESS = STREET
    AND A.CITY = CITY_NAME
    AND A.POSTAL_CODE = POST;

    RETURN ID;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ID = '|| ID);


        SELECT MAX(ADDRESS_ID) INTO ID
        FROM ADDRESS;
        -- UNIQUE IN FOR NEW ADDRESS
        ID := ID + 1;
        DBMS_OUTPUT.PUT_LINE(ID);
        -- INSERT NEW ADDRESS
        INSERT INTO ADDRESS
        (ADDRESS_ID, STREET_ADDRESS, CITY, POSTAL_CODE, SUB_DISTRICT, DISTRICT)
        VALUES
        (ID, STREET, CITY_NAME, POST, SUB, DIS);

        RETURN ID;
END;


-- TO FIND RUNNING AND PAST MEDICINES
CREATE OR REPLACE FUNCTION
    MED_RUNNING_INDEX(GIVEN_DATE IN VARCHAR2,
                    DATE_FORMAT IN VARCHAR2,
                    DURATION IN VARCHAR2)
RETURN NUMBER IS
    P_DATE DATE;
BEGIN
    P_DATE := TO_DATE(GIVEN_DATE, DATE_FORMAT);
    RETURN (P_DATE + DURATION) - SYSDATE;
EXCEPTION
    WHEN VALUE_ERROR THEN
      RETURN 99999;
END;
/


--TAKE MEDICINE TILL DATE (HANDLES CONTINUE ISSUES)
CREATE OR REPLACE FUNCTION TILLDATE(APP IN NUMBER, MED IN NUMBER)
RETURN VARCHAR2 IS
		STARTDATE DATE;
		ENDDATE VARCHAR2(15);
		DURATIONS VARCHAR2(15);
		INT_DURATION NUMBER;
BEGIN 
		SELECT APPOINTMENT_DATE INTO STARTDATE
		FROM MEDICAL.PAST_APPOINTMENT
		WHERE APPOINTMENT_ID= APP;
		
		SELECT DURATION INTO DURATIONS
		FROM MEDICAL.PRESCRIBED_MEDICINES
		WHERE APPOINTMENT_ID = APP AND MEDICINE_ID = MED;
		
		BEGIN
			INT_DURATION := TO_NUMBER(DURATIONS);
		EXCEPTION
			WHEN OTHERS THEN
					INT_DURATION := -1;
		END;
		
		IF INT_DURATION = -1 THEN
			ENDDATE:= 'Continue';
		ELSE
			ENDDATE:= TO_CHAR(STARTDATE + NVL(INT_DURATION,0), 'DD/MM/YYYY');
			
		END IF;
		
		RETURN ENDDATE;
	END;




--CONCATS AVAILABLE WEEKS DAYS OF A DOCTOR IN A MEDICAL CENTER
CREATE OR REPLACE FUNCTION AVAILABLE_DAYS (D_ID IN VARCHAR2, M_ID IN VARCHAR2)
RETURN VARCHAR2 IS

DAYS VARCHAR2(100);
TEMPDAY VARCHAR2(12);
COUNTER NUMBER;

BEGIN 
  DAYS:='';
  COUNTER:=0;
  
  FOR R IN (SELECT WEEK_DAYS FROM MEDICAL.DOCTOR_AVAILABILITY WHERE DOCTOR_ID= D_ID AND CENTER_ID= M_ID)
  LOOP
  
    TEMPDAY:= R.WEEK_DAYS;
    DBMS_OUTPUT.PUT_LINE(TEMPDAY);
    
    IF TEMPDAY IS NOT NULL THEN
      COUNTER:=COUNTER +1;
      IF COUNTER = 1 THEN
        DAYS:= TEMPDAY;
      ELSIF COUNTER>1 THEN
        DAYS:= DAYS||', '||TEMPDAY;
      END IF;
    END IF; 
    DBMS_OUTPUT.PUT_LINE(DAYS);
  END LOOP;
  
  RETURN DAYS;

EXCEPTION
  WHEN OTHERS THEN
      RETURN '-';
END;


CREATE OR REPLACE FUNCTION
    MED_RUNNING_INDEX(GIVEN_DATE IN VARCHAR2,
                    DATE_FORMAT IN VARCHAR2,
                    DURATION IN VARCHAR2)
RETURN NUMBER IS
    P_DATE DATE;
BEGIN
    P_DATE := TO_DATE(GIVEN_DATE, DATE_FORMAT);
    RETURN (P_DATE + DURATION) - SYSDATE;
EXCEPTION
    WHEN VALUE_ERROR THEN
      RETURN 99999;
END;