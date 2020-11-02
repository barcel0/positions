const tradersDescriptions = {
    disaggregated: {
        prodMerc: 'A “producer/merchant/processor/user” is an entity that predominantly engages in the production, processing, packing or handling of a physical commodity and uses the futures markets to manage or hedge risks associated with those activities.',
        swapDealier: 'A “swap dealer” is an entity that deals primarily in swaps for a commodity and uses the futures markets to manage or hedge the risk associated with those swaps transactions. The swap dealer’s counterparties may be speculative traders, like hedge funds, or traditional commercial clients that are managing risk arising from their dealings in the physical commodity.',
        moneyManager: 'Registered commodity trading advisor (CTA); a registered commodity pool operator (CPO); or an unregistered fund identified by CFTC. These traders are engaged in managing and conducting organized futures trading on behalf of clients.',
        otherReportables: 'Every other reportable trader that is not placed into one of the other three categories. The traders in this category mostly are using markets to hedge business risk, whether that risk is related to foreign exchange, equities or interest rates. This category includes corporate treasuries, central banks, smaller banks, mortgage originators, credit unions and any other reportable traders not assigned to the other three categories.',
        nonReportable: 'The long and short open interest shown as "Nonreportable Positions" is derived by subtracting total long and short "Reportable Positions" from the total open interest. Accordingly, for "Nonreportable Positions," the number of traders involved and the commercial/non-commercial classification of each trader are unknown.'
    },
    financial: {
        dealer: 'Typically described as the “sell side” of the market. Though they may not predominately sell futures, they do design and sell various financial assets to clients.  They tend to have matched books or offset their risk across markets and clients.  Futures contracts are part of the pricing and balancing of risk associated with the products they sell and their activities.  These include large banks (U.S. and non-U.S.) and dealers in securities, swaps and other derivatives.',
        assetMgr: 'Institutional investors, including pension funds, endowments, insurance companies, mutual funds and those portfolio/investment managers whose clients are predominantly institutional.',
        levFunds: 'Typically hedge funds and various types of money managers, including registered commodity trading advisors (CTAs); registered commodity pool operators (CPOs) or unregistered funds identified by CFTC. The strategies may involve taking outright positions or arbitrage within and across markets. The traders may be engaged in managing and conducting proprietary futures trading and trading on behalf of speculative clients.',
        otherReportables: 'Every other reportable trader that is not placed into one of the other three categories. The traders in this category mostly are using markets to hedge business risk, whether that risk is related to foreign exchange, equities or interest rates. This category includes corporate treasuries, central banks, smaller banks, mortgage originators, credit unions and any other reportable traders not assigned to the other three categories.',
        nonReportable: 'The long and short open interest shown as "Nonreportable Positions" is derived by subtracting total long and short "Reportable Positions" from the total open interest. Accordingly, for "Nonreportable Positions," the number of traders involved and the commercial/non-commercial classification of each trader are unknown.'
    }
}

module.exports = tradersDescriptions;