import * as React from "react";
import {
  Container,
  Box,
  Stack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";

import { FallInPlace } from "../components/motion/fall-in-place";
import { Hero } from "../components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "../components/typography";
import {
  FiArrowRight,
  FiSmile,
  FiSliders,
  FiGrid,
  FiThumbsUp,
  FiCheck,
  FiCopy,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import { Features } from "../components/features";
import { BackgroundGradient } from "../components/gradients/background-gradient";

import { ButtonLink } from "../components/button-link/button-link";
import { Highlights, HighlightsItem, HighlightsTestimonialItem } from "../components/highlights";

const Home = () => {
  return (
    <Box>
      <Box>
        <HeroSection />
        <HighlightsSection />
        <Footer />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 10, lg: 20 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Discover Delicious
                <Br /> Meals Effortlessly
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                Our <Em>Meals API</Em> offers access to thousands of recipes,
                <Br /> nutritional information, and seamless integration
                <Br /> for your applications.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <ButtonGroup spacing={4} pr={"5"} pt={"5"} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="/login"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: "common",
                        transitionDuration: "normal",
                        ".chakra-button:hover &": {
                          transform: "translate(5px)",
                        },
                      }}
                    />
                  }
                >
                  Login
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "60%", xl: "55%" }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%"></Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        pb="20"
        features={[
          {
            title: "Extensive Recipe Collection",
            icon: FiSmile,
            description: "Access over 10,000 recipes from various cuisines.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Nutritional Information",
            icon: FiSliders,
            description:
              "Detailed nutritional information for each recipe to help you make informed choices.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Easy Integration",
            icon: FiGrid,
            description:
              "Seamlessly integrate our API into your applications with ease.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Regular Updates",
            icon: FiThumbsUp,
            description:
              "Our database is regularly updated with new recipes and features.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @meals-api/react");

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core Features">
        <VStack alignItems="flex-start" spacing="12">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>comprehensive meal data</Em>. Including a vast
            collection of recipes, nutritional details, and easy integration.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                @meals-api/react
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Built on Strong Foundations">
        <Text color="muted" fontSize="lg">
          We built our API on solid and reliable technology, ensuring you get
          the best performance and reliability.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Jane Doe"
        description="Founder, RecipeApp"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “The Meals API allowed us to integrate a rich recipe database into our app effortlessly. It's been a game-changer for our users.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Enhance Your Application"
      >
        <Text color="muted" fontSize="lg">
          With our API, you can enhance your application by adding functionalities that make it stand out.
        </Text>
        <Wrap mt="8">
          {[
            "recipe search",
            "ingredient filtering",
            "dietary preferences",
            "meal planning",
            "nutrition tracking",
            "user favorites",
            "shopping lists",
            "recipe sharing",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};
const Footer = () => {
  return (
    <Box position="relative" overflow="hidden" pt="10em" pb={"10"}>
      <Container maxW="container.xl">
        <Stack direction={{ base: "column", md: "row" }} spacing="8" justify="space-between">
          <VStack align="start">
            <Heading size="md">Meals API</Heading>
            <Text>Access a rich collection of recipes and nutritional information.</Text>
          </VStack>
        </Stack>
        <Text mt="8" fontSize="sm" textAlign="center">
          © 2024 Meals API. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Support us by starring on GitHub! 🚀 ",
        description:
          '<img src="https://img.shields.io/github/stars/meals-api/meals-api.svg?style=social&label=Star" />',
        href: "https://github.com/meals-api/meals-api",
        action: false,
      },
    },
  };
}
