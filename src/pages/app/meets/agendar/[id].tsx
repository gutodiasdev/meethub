import { useContext, useState } from "react";
import { Flex, Box, HStack, Tag, Heading, Text, Center, Grid, GridItem, Button , Select, FormControl, FormLabel} from '@chakra-ui/react';

import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import AppContainer from "../../../../components/AppContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../components/Forms/Input";
import { AuthContext } from "../../../../contexts/AuthContext";
import { api } from "../../../../services/apiClient";
import Router from "next/router";

type User = {
  id: string;
}

type CheckoutFormData = {
  endDate: string;
  user: User;
  cardNumber: string;
  cardCvv: string;
  cardExpirationDate: string;
  cardHolderName: string;
  userName: string;
  userType?: string;
  country: string;
  userEmail: string;
  documentType: string;
  documentNumber: string;
  birthday?: string;
  billingName?: string;
  stateShortname: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  zipcode: string;
  meetId: string;
  meetName: string;
  unitPrice: number;
  meetQuantity: number;
  phoneNumbers: string;
}

const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);
  const [selectedDate, setSelectedDate] = useState(false)

  const { user } = useContext(AuthContext)

  const { register, formState, handleSubmit } = useForm()

  const { isSubmitting } = formState

  function handleBookingDateClick() {
    if (!selectedDate) {
      setSelectedDate(true);
    } else {
      setSelectedDate(false);
    }
  }

  const handleCheckout: SubmitHandler<CheckoutFormData> = async (values, event) => {
    event.preventDefault();

    const meetPrice = Number(meets.price + "00")

    const data = {
      userRole: "user",
      endDate: "2021-12-06T15:30:00", //TODO - TEMPORARY
      amount: meetPrice,
      cardNumber: values.cardNumber,
      cardCvv: values.cardCvv,
      cardExpirationDate: values.cardExpirationDate,
      cardHolderName: values.cardHolderName,
      // person
      userId: user.id,
      userName: values.userName,
      type: "individual",
      country: "br",  //TODO Country Switcher values.country
      userEmail: values.userEmail,
      // document
      documentType: "cpf",
      documentNumber: values.documentNumber,
      phoneNumbers: "+55" + values.phoneNumbers,
      // Adress
      billingName: values.userName,
      stateShortname: values.stateShortname,
      city: values.city,
      neighborhood: values.neighborhood,
      street: values.street,
      streetNumber: values.streetNumber,
      zipcode: values.zipcode,
      //products
      meetId: Router.query.id,
      meetName: meets.name,
      unitPrice: meetPrice,
      meetQuantity: 1,
    }

    console.log(data);

    await api.post(`meets/pay/${meets.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          Router.push('/app/meets/meus')
        }

        return console.log(response.data)
      })

  }

  return (
    <AppContainer>
      <Flex
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="8"
        width="100%"
        p="4"
      >
        <Flex
          flex="1"
          h="100%"
          justify="space-between"
        >
          <Flex direction="column" flex="1" pr="4">
            <HStack>
              <Tag size="sm">Marketing</Tag>
              <Tag size="sm">Carreira</Tag>
            </HStack>
            <Heading
              size="md"
              mt="2"
              mb="2"
            >
              {meets.name}</Heading>
            <Text
              color="gray.500"
            >
              {meets.meetDetails}</Text>
          </Flex>
          <Box>
            <Heading size="md" color="gray.600">R${meets.price}</Heading>
          </Box>
        </Flex>

      </Flex>
      <HStack
        w="100%"
        py="4"
      >
        {!selectedDate ? (
          <Center
            border="1px"
            w="100px"
            h="100px"
            borderColor="gray.100"
            borderRadius={8}
            transitionDuration="2"
            cursor="pointer"
            onClick={handleBookingDateClick}
            textAlign="center"
            flexDirection="column"
          >
            <Text color="gray.400" fontSize="xs">DEZ</Text>
            <Heading>03</Heading>
            <Text>21:00</Text>
          </Center>
        ) : (
          <Center
            w="100px"
            h="100px"
            bg="blue.500"
            borderRadius={8}
            cursor="pointer"
            onClick={handleBookingDateClick}
            textAlign="center"
            flexDirection="column"
          >
            <Text color="gray.100" fontSize="xs">DEZ</Text>
            <Heading color="white">03</Heading>
            <Text color="white">21:00</Text>
          </Center>
        )}
      </HStack>

      <Flex
        as="form"
        w="100%"
        onSubmit={handleSubmit(handleCheckout)}
        direction="column"
      >
        <Heading
        as="span"
        size="md"
        fontWeight='thin'
        textAlign="left"
        color="gray.400"
        py={4}
        >
        Dados do comprador
        </Heading>
        <Grid
          w="100%"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem columnSpan={1} >
            <Input
              name="userName"
              id="userName"
              type="text"
              label="Nome completo"
              mb={4}
              {...register('userName')}
            />
            <Input
              name="street"
              id="street"
              type="text"
              label="Endereço"
              mb={4}
              {...register('street')}
            />
            
            <Input
              name="streetNumber"
              id="streetNumber"
              type="text"
              label="Número"
              mb={4}
              {...register('streetNumber')}
            />  
          
            <Input
              name="city"
              id="city"
              type="text"
              label="Cidade"
              mb={4}
              {...register('city')}
            />

            <FormControl>
            <FormLabel for="stateShortname" color="gray.500">Estado</FormLabel>
            <Select
              name="stateShortname"
              id="stateShortname"
              type="text"
              mb={4}
              h={12}
              variant="filled"
              width="80px"
              {...register('stateShortname')}
            >
              <option value="ac">AC</option>
              <option value="al">AL</option>
              <option value="ap">AP</option>
              <option value="am">AM</option>
              <option value="ba">BA</option>
              <option value="ce">CE</option>
              <option value="es">ES</option>
              <option value="go">GO</option>
              <option value="ma">MA</option>
              <option value="mt">MT</option>
              <option value="ms">MS</option>
              <option value="mg">MG</option>
              <option value="pa">PA</option>
              <option value="pb">PB</option>
              <option value="pr">PR</option>
              <option value="pe">PE</option>
              <option value="pi">PI</option>
              <option value="rj">RJ</option>
              <option value="rn">RN</option>
              <option value="rs">RS</option>
              <option value="ro">RO</option>
              <option value="rr">RR</option>
              <option value="rs">SC</option>
              <option value="sp">SP</option>
              <option value="se">SE</option>
              <option value="to">TO</option>
              <option value="df">DF</option>
            </Select>
            </FormControl>

            <Input
              name="userEmail"
              id="userEmail"
              type="text"
              label="Email"
              mb={4}
              {...register('userEmail')}
            />
          </GridItem>
          <GridItem columnSpan={1}>
          <Input
              name="documentNumber"
              id="documentNumber"
              type="text"
              label="CPF"
              mb={4}
              {...register('documentNumber')}
            />
             <Input
              name="country"
              id="country"
              type="text"
              label="País"
              mb={4}
              {...register('country')}
            />
            <Input
              name="zipcode"
              id="zipcode"
              type="text"
              label="CEP"
              mb={4}
              {...register('zipcode')}
            />
            <Input
              name="neighborhood"
              id="neighborhood"
              type="text"
              label="Bairro"
              mb={4}
              {...register('neighborhood')}
            />
            <Input
              name="phoneNumbers"
              id="phoneNumbers"
              type="text"
              label="Telefone"
              mb={4}
              {...register('phoneNumbers')}
            />
          </GridItem>
        </Grid>
        <Heading
        as="span"
        size="md"
        fontWeight='thin'
        textAlign="left"
        color="gray.400"
        py={4}
        >
        Dados de pagamento
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem columnSpan={1}>
              <Input
                name="cardHolderName"
                id="cardHolderName"
                type="text"
                label="Nome (como escrito no cartão)"
                mb={4}
                {...register('cardHolderName')}
              />
              <Input
                name="cardNumber"
                id="cardNumber"
                type="text"
                label="Número do cartão"
                mb={4}
                {...register('cardNumber')}
              />
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Input
                name="cardExpirationDate"
                id="cardExpirationDate"
                type="text"
                label="Validade"
                {...register('cardExpirationDate')}
              />
              <Input
                name="cardCvv"
                id="cardCvv"
                type="text"
                label="CVV"
                {...register('cardCvv')}
              />
              </Grid>

            </GridItem>
            <GridItem columnSpan={1}>

            </GridItem>
        </Grid>

        <Button
          type="submit"
          size="lg"
          mt="4"
          colorScheme="blue"
          isLoading={isSubmitting}
        >
          Finalizar compra
        </Button>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${ctx.query.id}`);

  return {
    props: {
      meet: response.data
    }
  }
})

export default Meet