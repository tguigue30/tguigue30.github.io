import pandas as pd
from scipy.stats import jarque_bera, shapiro, skewtest, kurtosistest
from statsmodels.stats.diagnostic import het_arch, acorr_ljungbox
from statsmodels.stats.stattools import durbin_watson

def tests(residuals):
    # Calculer les statistiques des différents tests
    jb_stat, jb_p_value = jarque_bera(residuals)
    shapiro_stat, shapiro_p_value = shapiro(residuals)
    ljung_results = acorr_ljungbox(residuals, lags=[10], return_df=True)
    ljung_stat = ljung_results['lb_stat'].values[0]
    ljung_p_value = ljung_results['lb_pvalue'].values[0]
    arch_stat, arch_p_value, _, _ = het_arch(residuals)
    skew_stat, skew_p_value = skewtest(residuals)
    kurtosis_stat, kurtosis_p_value = kurtosistest(residuals)
    dw_stat = durbin_watson(residuals)

    # Prendre les décisions en fonction des p-valeurs
    alpha = 0.05
    jb_decision = "Non Normalité" if jb_p_value < alpha else "Normalité"
    shapiro_decision = "Non Normalité" if shapiro_p_value < alpha else "Normalité"
    ljung_decision = "Autocorrélation" if ljung_p_value < alpha else "Absence d'autocorrélation"
    arch_decision = "Hétéroscédascité" if arch_p_value < alpha else "Homoscédasticité"
    skew_decision = "Symétrie nulle" if skew_p_value < alpha else "Asymétrie nulle"
    kurtosis_decision = "Excès de Kurtosis normale" if kurtosis_p_value < alpha else "Kurtosis normale"
    dw_decision = "Autocorrélation ordre 1" if dw_stat < 1.5 or dw_stat > 2.5 else "Non autocorrélation ordre 1"

    # Créer un DataFrame rassemblant tous les résultats des tests
    combined_test_results_df = pd.DataFrame({
        'Statistique de test': [
            jb_stat, shapiro_stat, ljung_stat, arch_stat, 
            skew_stat, kurtosis_stat, dw_stat
        ],
        'p-valeur': [
            jb_p_value, shapiro_p_value, ljung_p_value, arch_p_value,
            skew_p_value, kurtosis_p_value, None  # Durbin-Watson n'a pas de p-valeur
        ],
        'Décision': [
            jb_decision, shapiro_decision, ljung_decision, 
            arch_decision, skew_decision, kurtosis_decision, dw_decision
        ]
    }, index=[
        "Test de Jarque-Bera", "Test de Shapiro-Wilk", 
        "Test de Ljung-Box", "Test ARCH", "Test de Skewness", 
        "Test de Kurtosis", "Test de Durbin-Watson"
    ])
    
    # Retourner le tableau des résultats
    return combined_test_results_df

