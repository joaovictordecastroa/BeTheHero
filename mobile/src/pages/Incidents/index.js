import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

import LogoImg from "../../assets/Logo.png";

import styles from "./styles"

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigationToDetails(incident) {
        navigation.navigate("Details", { incident });
    }

    async function loadIncidents() {
        try {
            if (loading) {
                return;
            }

            if (total > 0 && incidents.length === total) {
                return;
            }

            setLoading(true);

            const response = await api.get("incidents", {
                params: { page }
            });

            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers["x-total-count"]);
            setPage(page + 1);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg} />

                <Text style={styles.headerText}>
                    Total de
                    <Text style={styles.headerTextBold}> {total} casos</Text>
                    .
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo !</Text>

            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia !
            </Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incidents}>
                        <Text style={styles.incidentProperty}>
                            ONG:
                        </Text>

                        <Text style={styles.incidentValue}>
                            {incident.name}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            Caso:
                        </Text>

                        <Text style={styles.incidentValue}>
                            {incident.title}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            Valor:
                        </Text>

                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat("pt-BR",
                                { style: "currency", currency: "BRL" })
                                .format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton}
                            onPress={() => navigationToDetails(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}