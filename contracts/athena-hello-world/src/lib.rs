use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, PanicOnDefault};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        Self {
        }
    }

    pub fn hello(&self, name: String) -> String {
        format!("Hello {}!", name)
    }

    #[payable]
    pub fn donate(&mut self, name: String) -> String {
        let deposit = (env::attached_deposit() as f64)/(10u128.pow(24) as f64);
        env::log_str(format!("Thanks for the {} NEAR.", deposit).as_str());
        format!("Hello {}!", name)
    }
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test -- --nocapture
 * Note: 'rust-template' comes from Cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{VMContextBuilder};
    //use near_sdk::test_utils::{get_logs, VMContextBuilder};
    use near_sdk::{testing_env, AccountId};

    // part of writing unit tests is setting up a mock context
    // provide a `predecessor` here, it'll modify the default context
    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn hello_test() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice1.testnet".to_string());
        // Set up the testing context and unit test environment
        let context = get_context(alice.clone());
        testing_env!(context.build());

        // Set up contract object and call the new method
        let contract = Contract::new();
        
        //test something with the contract
        assert_eq!(contract.hello("Cryptosketches".to_string()), "Hello Cryptosketches!".to_string());
    }
}
